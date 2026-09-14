import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface WishlistScreenProps {
  wishlistProducts: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
  onToggleWishlist: (product: Product) => void;
  onBackToShop: () => void;
}

export const WishlistScreen: React.FC<WishlistScreenProps> = ({
  wishlistProducts,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  onBackToShop,
}) => {
  return (
    <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-16 py-6 md:py-10 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e4beb4]/50 pb-5">
        <div>
          <div className="text-xs uppercase font-bold text-[#b02f00] tracking-wider mb-1">
            Saved Performance Gear
          </div>
          <h1 className="font-display font-extrabold text-2xl md:text-3xl text-[#1c1b1b]">
            My Wishlist ({wishlistProducts.length})
          </h1>
          <p className="text-xs md:text-sm text-[#5b4039] mt-1">
            Items saved for quick access and price tracking.
          </p>
        </div>

        {wishlistProducts.length > 0 && (
          <button
            onClick={onBackToShop}
            className="text-xs md:text-sm font-semibold text-[#b02f00] hover:underline"
          >
            Continue Shopping →
          </button>
        )}
      </div>

      {wishlistProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {wishlistProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              onAddToCart={onAddToCart}
              isWishlisted={true}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-[#e4beb4]/40 max-w-md mx-auto">
          <span className="material-symbols-outlined text-6xl text-[#ba1a1a]/40 mb-3">
            favorite
          </span>
          <h3 className="font-display font-bold text-lg text-[#1c1b1b]">Your Wishlist is Empty</h3>
          <p className="text-xs text-[#5b4039] mt-1 mb-6">
            Tap the heart icon on any gear to save items for future training sessions.
          </p>
          <button
            onClick={onBackToShop}
            className="bg-[#b02f00] text-white text-xs font-bold px-6 py-3 rounded-lg hover:bg-[#862200] transition-colors"
          >
            Explore Performance Collection
          </button>
        </div>
      )}
    </main>
  );
};
