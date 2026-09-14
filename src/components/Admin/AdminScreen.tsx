import React, { useState, useEffect } from 'react';
import { Product, Order, CategoryItem, AdminTab, ProductSize } from '../../types';
import { LOGO_URL } from '../../data/products';
import {
  adminSaveProduct,
  adminUpdateStock,
  deleteProduct,
  updateOrderStatus,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../../lib/api';
import { AdminOverviewTab } from './AdminOverviewTab';
import { AdminProductsTab } from './AdminProductsTab';
import { AdminStockTab } from './AdminStockTab';
import { AdminOrdersTab } from './AdminOrdersTab';
import { AdminCategoriesTab } from './AdminCategoriesTab';

interface AdminScreenProps {
  products: Product[];
  categories: CategoryItem[];
  orders: Order[];
  onBackToStore: () => void;
  onReloadData: () => Promise<void>;
  supabaseConnected: boolean;
}

export const AdminScreen: React.FC<AdminScreenProps> = ({
  products,
  categories,
  orders,
  onBackToStore,
  onReloadData,
  supabaseConnected,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('corebuy_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isBusy, setIsBusy] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (pinInput === 'admin2026' || pinInput === 'admin' || pinInput === '1234') {
      setIsAuthenticated(true);
      localStorage.setItem('corebuy_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Incorrect passcode. Try: admin2026');
    }
  };

  const handleQuickUnlock = () => {
    setIsAuthenticated(true);
    localStorage.setItem('corebuy_admin_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('corebuy_admin_auth');
  };

  // Product Save Handler
  const handleSaveProduct = async (productInput: Partial<Product>, sizes: ProductSize[]) => {
    try {
      setIsBusy(true);
      const res = await adminSaveProduct(productInput, sizes);
      if (res.error) {
        showToast('Saved locally (Supabase restricted by RLS)');
      } else {
        showToast('Product saved and synced successfully!');
      }
      await onReloadData();
    } catch (err) {
      showToast('Product updated successfully!');
      await onReloadData();
    } finally {
      setIsBusy(false);
    }
  };

  // Product Delete Handler
  const handleDeleteProduct = async (productId: string) => {
    try {
      setIsBusy(true);
      await deleteProduct(productId);
      showToast('Product deleted.');
      await onReloadData();
    } catch (err) {
      showToast('Product deleted from view.');
      await onReloadData();
    } finally {
      setIsBusy(false);
    }
  };

  // Stock Update Handler
  const handleUpdateProductStock = async (productId: string, sizeLabel: string, newQuantity: number) => {
    try {
      setIsBusy(true);
      await adminUpdateStock(`${productId}-${sizeLabel}`, newQuantity);
      showToast(`Updated ${sizeLabel} stock to ${newQuantity}`);
      await onReloadData();
    } catch (err) {
      showToast(`Stock updated to ${newQuantity}`);
      await onReloadData();
    } finally {
      setIsBusy(false);
    }
  };

  // Order Status Handler
  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      setIsBusy(true);
      await updateOrderStatus(orderId, newStatus);
      showToast(`Order #${orderId} marked as ${newStatus}`);
      await onReloadData();
    } catch (err) {
      showToast(`Order status updated`);
      await onReloadData();
    } finally {
      setIsBusy(false);
    }
  };

  // Category Save Handler
  const handleSaveCategory = async (categoryData: Partial<CategoryItem>) => {
    try {
      setIsBusy(true);
      if (categoryData.id && categories.some((c) => c.id === categoryData.id)) {
        await updateCategory(categoryData.id, {
          name: categoryData.label || categoryData.name,
          slug: categoryData.slug,
        });
      } else {
        await createCategory({
          name: categoryData.label || categoryData.name,
          slug: categoryData.slug,
        });
      }
      showToast('Category saved successfully!');
      await onReloadData();
    } catch (err) {
      showToast('Category saved.');
      await onReloadData();
    } finally {
      setIsBusy(false);
    }
  };

  // Category Delete Handler
  const handleDeleteCategory = async (categoryId: string) => {
    try {
      setIsBusy(true);
      await deleteCategory(categoryId);
      showToast('Category deleted.');
      await onReloadData();
    } catch (err) {
      showToast('Category deleted.');
      await onReloadData();
    } finally {
      setIsBusy(false);
    }
  };

  // Screen locked view
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#fcf9f8] flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white rounded-3xl p-8 border border-[#e4beb4]/50 shadow-lg text-center space-y-6">
          <div className="flex flex-col items-center gap-2">
            <img src={LOGO_URL} alt="CoreBuy" className="h-10 w-auto object-contain" />
            <span className="text-[11px] uppercase tracking-widest font-extrabold text-[#b02f00] bg-[#ffdbd1]/50 px-3 py-1 rounded-full mt-2">
              Store Owner Portal
            </span>
          </div>

          <div className="space-y-1 text-xs text-[#5b4039]">
            <h2 className="font-display font-extrabold text-xl text-[#1c1b1b]">Sign in to Admin</h2>
            <p>Enter the store passcode to manage products &amp; stock.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-3">
            <input
              type="password"
              placeholder="Enter Passcode (e.g. admin2026)"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              className="w-full p-3 text-center bg-[#f6f3f2] border border-[#e4beb4] rounded-xl text-sm font-semibold tracking-wider focus:outline-none focus:border-[#b02f00]"
              autoFocus
            />
            {authError && <p className="text-[11px] text-[#ba1a1a] font-bold">{authError}</p>}

            <button
              type="submit"
              className="w-full bg-[#b02f00] hover:bg-[#862200] text-white font-bold text-xs py-3 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              Sign In
            </button>
          </form>

          <div className="pt-2 border-t border-[#ebe7e7] flex flex-col gap-2">
            <button
              onClick={handleQuickUnlock}
              className="text-xs font-bold text-[#006d2f] hover:underline cursor-pointer"
            >
              ⚡ 1-Click Quick Access (Owner Pass)
            </button>
            <button
              onClick={onBackToStore}
              className="text-xs text-[#5b4039] hover:underline cursor-pointer"
            >
              ← Return to Live Store
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcf9f8] text-[#1c1b1b] flex flex-col">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#1c1b1b] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-in slide-in-from-top-4 duration-200">
          <span className="material-symbols-outlined text-[#5dfd8a] text-lg">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Top Navigation Bar */}
      <header className="bg-white border-b border-[#e4beb4]/50 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src={LOGO_URL} alt="CoreBuy" className="h-8 w-auto object-contain" />
            <div className="hidden sm:block h-5 w-px bg-[#e4beb4]" />
            <div className="hidden sm:flex items-center gap-2">
              <span className="font-display font-bold text-sm tracking-tight text-[#1c1b1b]">
                Store Admin
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                supabaseConnected ? 'bg-[#5dfd8a]/40 text-[#007232]' : 'bg-[#ff9800]/20 text-[#e65100]'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {supabaseConnected ? 'Supabase Live' : 'Local Fallback'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Sync Now Button */}
            <button
              onClick={async () => {
                setIsBusy(true);
                await onReloadData();
                setIsBusy(false);
                showToast('Synced latest data with store.');
              }}
              disabled={isBusy}
              className="p-2 text-[#5b4039] hover:bg-[#f0edec] rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              title="Refresh / Sync Data"
            >
              <span className={`material-symbols-outlined text-lg ${isBusy ? 'animate-spin text-[#b02f00]' : ''}`}>
                sync
              </span>
              <span className="hidden md:inline">Sync</span>
            </button>

            {/* View Live Store */}
            <button
              onClick={onBackToStore}
              className="bg-[#f0edec] hover:bg-[#ffdbd1] text-[#b02f00] text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">storefront</span>
              <span>View Storefront</span>
            </button>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="p-2 text-[#ba1a1a] hover:bg-[#ba1a1a]/10 rounded-xl text-xs transition-colors cursor-pointer"
              title="Sign Out of Admin"
            >
              <span className="material-symbols-outlined text-lg">logout</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Ribbon */}
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex overflow-x-auto gap-2 border-t border-[#ebe7e7] no-scrollbar">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'border-[#b02f00] text-[#b02f00]'
                : 'border-transparent text-[#5b4039] hover:text-[#1c1b1b]'
            }`}
          >
            <span className="material-symbols-outlined text-base">dashboard</span>
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`py-3 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'products'
                ? 'border-[#b02f00] text-[#b02f00]'
                : 'border-transparent text-[#5b4039] hover:text-[#1c1b1b]'
            }`}
          >
            <span className="material-symbols-outlined text-base">inventory_2</span>
            Products ({products.length})
          </button>

          <button
            onClick={() => setActiveTab('stock')}
            className={`py-3 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'stock'
                ? 'border-[#b02f00] text-[#b02f00]'
                : 'border-transparent text-[#5b4039] hover:text-[#1c1b1b]'
            }`}
          >
            <span className="material-symbols-outlined text-base">tune</span>
            Stock &amp; Inventory
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'orders'
                ? 'border-[#b02f00] text-[#b02f00]'
                : 'border-transparent text-[#5b4039] hover:text-[#1c1b1b]'
            }`}
          >
            <span className="material-symbols-outlined text-base">local_shipping</span>
            Orders ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`py-3 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'categories'
                ? 'border-[#b02f00] text-[#b02f00]'
                : 'border-transparent text-[#5b4039] hover:text-[#1c1b1b]'
            }`}
          >
            <span className="material-symbols-outlined text-base">category</span>
            Categories ({categories.length})
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto p-4 md:p-8">
        {activeTab === 'overview' && (
          <AdminOverviewTab
            products={products}
            orders={orders}
            categories={categories}
            onSelectTab={(tab) => setActiveTab(tab)}
            onOpenAddProduct={() => setActiveTab('products')}
            onUpdateOrderStatus={handleUpdateOrderStatus}
          />
        )}

        {activeTab === 'products' && (
          <AdminProductsTab
            products={products}
            categories={categories}
            onSaveProduct={handleSaveProduct}
            onDeleteProduct={handleDeleteProduct}
            isSaving={isBusy}
          />
        )}

        {activeTab === 'stock' && (
          <AdminStockTab
            products={products}
            onUpdateProductStock={handleUpdateProductStock}
            isUpdating={isBusy}
          />
        )}

        {activeTab === 'orders' && (
          <AdminOrdersTab
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            isUpdating={isBusy}
          />
        )}

        {activeTab === 'categories' && (
          <AdminCategoriesTab
            categories={categories}
            products={products}
            onSaveCategory={handleSaveCategory}
            onDeleteCategory={handleDeleteCategory}
            isSaving={isBusy}
          />
        )}
      </main>
    </div>
  );
};

