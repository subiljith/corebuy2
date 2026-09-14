import React, { useState, useEffect, useCallback } from 'react';
import { Product, CartItem, CategoryType, ViewScreen, Order, CategoryItem } from './types';
import { PRODUCTS, CATEGORIES_DATA } from './data/products';
import {
  getProducts,
  getCategories,
  getOrders,
  createOrder,
  checkSupabaseConnection,
} from './lib/api';
import { Header } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { ShopScreen } from './components/ShopScreen';
import { ProductDetailScreen } from './components/ProductDetailScreen';
import { CheckoutScreen } from './components/CheckoutScreen';
import { WishlistScreen } from './components/WishlistScreen';
import { AccountScreen } from './components/AccountScreen';
import { OrderSuccessScreen } from './components/OrderSuccessScreen';
import { CartDrawer } from './components/CartDrawer';
import { SizeGuideModal } from './components/SizeGuideModal';
import { BottomNavBar } from './components/BottomNavBar';
import { Footer } from './components/Footer';
import { AdminScreen } from './components/Admin/AdminScreen';

export default function App() {
  // Navigation State
  const [currentScreen, setCurrentScreen] = useState<ViewScreen>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Dynamic Supabase State
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [categories, setCategories] = useState<CategoryItem[]>(CATEGORIES_DATA);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [supabaseConnected, setSupabaseConnected] = useState<boolean>(true);
  
  // Selected Product for PDP
  const [selectedProduct, setSelectedProduct] = useState<Product>(
    PRODUCTS.find((p) => p.id === 'corebuy-aerotee-orange') || PRODUCTS[0]
  );

  // Cart State (Initialized with items matching the order summary screenshot for instant fidelity)
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'item-1',
      product: PRODUCTS.find((p) => p.id === 'corebuy-aerotee-orange') || PRODUCTS[0],
      selectedSize: 'M',
      quantity: 1,
    },
    {
      id: 'item-2',
      product: PRODUCTS.find((p) => p.id === 'phantom-x-runners') || PRODUCTS[1],
      selectedSize: 'UK 8',
      quantity: 1,
    },
  ]);

  // Wishlist State (IDs)
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(
    new Set(['corebuy-aerotee-orange', 'pro-gear-duffle-40l'])
  );

  // Active Completed Order (for Success screen)
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);

  // Modals / Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Load dynamic data from Supabase backend
  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [fetchedProducts, fetchedCategories, fetchedOrders, conn] = await Promise.all([
        getProducts(),
        getCategories(),
        getOrders(),
        checkSupabaseConnection(),
      ]);

      if (fetchedProducts && fetchedProducts.length > 0) {
        setProducts(fetchedProducts);
        // If current selectedProduct is still default, pick from fetched
        setSelectedProduct((prev) => {
          const matched = fetchedProducts.find((p) => p.id === prev.id);
          return matched || fetchedProducts[0];
        });
      }

      if (fetchedCategories && fetchedCategories.length > 0) {
        setCategories(fetchedCategories);
      }

      if (fetchedOrders && fetchedOrders.length > 0) {
        setOrders(fetchedOrders);
      }

      setSupabaseConnected(conn.connected);
    } catch (err) {
      console.warn('[App] Supabase dynamic load note:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Scroll to top on screen change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen]);

  // Check URL hash or search for direct admin access, and listen for keyboard shortcut Ctrl+Shift+A
  useEffect(() => {
    const checkAdmin = () => {
      if (window.location.hash === '#admin' || window.location.search.includes('admin')) {
        setCurrentScreen('admin');
      }
    };
    checkAdmin();
    window.addEventListener('hashchange', checkAdmin);

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + Shift + A or Cmd + Shift + A to secretly toggle Admin
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setCurrentScreen((prev) => (prev === 'admin' ? 'home' : 'admin'));
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkAdmin);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Handlers
  const handleNavigate = (screen: ViewScreen, category?: CategoryType) => {
    if (category) {
      setSelectedCategory(category);
    }
    setCurrentScreen(screen);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentScreen('product-detail');
  };

  const handleAddToCart = (product: Product, size: string) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + 1,
        };
        return next;
      }
      return [
        ...prev,
        {
          id: `${product.id}-${size}-${Date.now()}`,
          product,
          selectedSize: size,
          quantity: 1,
        },
      ];
    });
  };

  const handleDirectBuy = (product: Product, size: string) => {
    handleAddToCart(product, size);
    setCurrentScreen('checkout');
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
      } else {
        next.add(product.id);
      }
      return next;
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentScreen('shop');
  };

  const handlePlaceOrder = async (newOrder: Order) => {
    try {
      const result = await createOrder(newOrder, newOrder.items);
      const finalizedOrder = result.data || newOrder;
      setOrders((prev) => [finalizedOrder, ...prev]);
      setLatestOrder(finalizedOrder);
    } catch (err) {
      console.warn('Fallback order place:', err);
      setOrders((prev) => [newOrder, ...prev]);
      setLatestOrder(newOrder);
    }
    setCart([]);
    setCurrentScreen('order-success');
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistProducts = products.filter((p) => wishlistIds.has(p.id));

  if (currentScreen === 'admin') {
    return (
      <AdminScreen
        products={products}
        categories={categories}
        orders={orders}
        onBackToStore={() => {
          if (window.location.hash === '#admin') {
            window.history.replaceState(null, '', window.location.pathname + window.location.search);
          }
          setCurrentScreen('home');
        }}
        onReloadData={loadData}
        supabaseConnected={supabaseConnected}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fcf9f8] text-[#1c1b1b] antialiased selection:bg-[#ffdbd1] selection:text-[#b02f00]">
      {/* Global Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.size}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={(q) => setSearchQuery(q)}
        onSearchSubmit={handleSearch}
        categories={categories}
        selectedCategory={selectedCategory}
        supabaseConnected={supabaseConnected}
      />

      {/* Screen Router */}
      {currentScreen === 'home' && (
        <HomeScreen
          products={products}
          categories={categories}
          onSelectProduct={handleSelectProduct}
          onAddToCart={handleAddToCart}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onNavigate={handleNavigate}
        />
      )}

      {currentScreen === 'shop' && (
        <ShopScreen
          products={products}
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          searchQuery={searchQuery}
          onSelectProduct={handleSelectProduct}
          onAddToCart={handleAddToCart}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
        />
      )}

      {currentScreen === 'product-detail' && (
        <ProductDetailScreen
          product={selectedProduct}
          onAddToCart={handleAddToCart}
          onDirectBuy={handleDirectBuy}
          isWishlisted={wishlistIds.has(selectedProduct.id)}
          onToggleWishlist={handleToggleWishlist}
          onBack={() => setCurrentScreen('shop')}
          onSelectProduct={handleSelectProduct}
          allProducts={products}
          onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        />
      )}

      {currentScreen === 'checkout' && (
        <CheckoutScreen
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onPlaceOrder={handlePlaceOrder}
          onBackToShop={() => setCurrentScreen('shop')}
        />
      )}

      {currentScreen === 'wishlist' && (
        <WishlistScreen
          wishlistProducts={wishlistProducts}
          onSelectProduct={handleSelectProduct}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          onBackToShop={() => setCurrentScreen('shop')}
        />
      )}

      {currentScreen === 'account' && (
        <AccountScreen
          orders={orders}
          onBackToShop={() => setCurrentScreen('shop')}
          onRefreshOrders={loadData}
          isLoading={isLoading}
        />
      )}

      {currentScreen === 'order-success' && latestOrder && (
        <OrderSuccessScreen
          order={latestOrder}
          onContinueShopping={() => setCurrentScreen('shop')}
          onViewAccount={() => setCurrentScreen('account')}
        />
      )}

      {/* Slide-over Cart Sheet */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setCurrentScreen('checkout')}
        onSelectProduct={handleSelectProduct}
        featuredProduct={products.find((p) => p.id === 'corebuy-aerotee-orange') || products[0]}
      />

      {/* Sizing Calculator Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Mobile Bottom Navigation Bar */}
      <BottomNavBar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.size}
      />
    </div>
  );
}
