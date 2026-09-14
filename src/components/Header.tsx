import React, { useState } from 'react';
import { ViewScreen, CategoryType, CategoryItem } from '../types';
import { LOGO_URL, CATEGORIES_DATA } from '../data/products';

interface HeaderProps {
  currentScreen: ViewScreen;
  onNavigate: (screen: ViewScreen, category?: CategoryType) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: (query: string) => void;
  categories?: CategoryItem[];
  selectedCategory?: CategoryType;
  supabaseConnected?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenCart,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  categories = CATEGORIES_DATA,
  selectedCategory,
  supabaseConnected = true,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearchKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchSubmit(localSearch);
    }
  };

  const navCategories = (categories && categories.length > 0 ? categories : CATEGORIES_DATA).map((c) => ({
    label: c.label,
    cat: c.id,
  }));

  return (
    <>
      {/* Top Notification Bar */}
      <div id="top-notification-bar" className="bg-[#b02f00] text-white py-2 px-4 md:px-16 text-center shadow-xs">
        <p className="text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-sm">local_shipping</span>
          Free Shipping across India on orders over ₹999
        </p>
      </div>

      {/* Desktop TopAppBar */}
      <header id="desktop-header" className="w-full top-0 sticky z-40 bg-[#fcf9f8]/95 backdrop-blur-md shadow-xs border-b border-[#e4beb4]/60 hidden md:block transition-all">
        <div className="flex items-center justify-between px-8 lg:px-16 py-3.5 max-w-[1440px] mx-auto">
          {/* Brand Logo */}
          <button
            id="brand-logo-button"
            onClick={() => onNavigate('home')}
            className="flex items-center h-9 focus:outline-none transition-transform hover:scale-[1.02] cursor-pointer"
            aria-label="CoreBuy Home"
          >
            <img
              alt="CoreBuy Logo"
              className="h-8 md:h-9 w-auto object-contain"
              src={LOGO_URL}
            />
          </button>

          {/* Main Navigation Links & Search */}
          <div className="flex-1 flex items-center justify-center px-6 gap-6">
            <nav className="flex space-x-6 items-center">
              <button
                onClick={() => onNavigate('home')}
                className={`text-sm font-semibold pb-1 transition-colors cursor-pointer ${
                  currentScreen === 'home'
                    ? 'text-[#b02f00] border-b-2 border-[#b02f00]'
                    : 'text-[#5b4039] hover:text-[#b02f00]'
                }`}
              >
                Home
              </button>
              {navCategories.map((item) => {
                const isActive = currentScreen === 'shop' && selectedCategory === item.cat;
                return (
                  <button
                    key={String(item.cat)}
                    onClick={() => onNavigate('shop', item.cat)}
                    className={`text-sm font-semibold transition-colors pb-1 cursor-pointer ${
                      isActive
                        ? 'text-[#b02f00] border-b-2 border-[#b02f00]'
                        : 'text-[#5b4039] hover:text-[#b02f00]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Desktop Search Bar */}
            <div className="relative w-full max-w-sm ml-2">
              <input
                id="desktop-search-input"
                className="w-full pl-10 pr-4 py-2 bg-[#f6f3f2] border border-[#e4beb4] rounded-full text-sm text-[#1c1b1b] placeholder:text-[#5b4039]/60 focus:outline-none focus:border-[#b02f00] focus:ring-1 focus:ring-[#b02f00] transition-all"
                placeholder="Search gear, shoes, apparel..."
                type="text"
                value={localSearch}
                onChange={(e) => {
                  setLocalSearch(e.target.value);
                  onSearchChange(e.target.value);
                }}
                onKeyDown={handleSearchKey}
              />
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#5b4039] text-xl pointer-events-none">
                search
              </span>
              {localSearch && (
                <button
                  onClick={() => {
                    setLocalSearch('');
                    onSearchChange('');
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#5b4039] hover:text-[#b02f00]"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-3 shrink-0">
            {/* Wishlist button */}
            <button
              id="header-wishlist-btn"
              onClick={() => onNavigate('wishlist')}
              className={`p-2.5 rounded-full hover:bg-[#ebe7e7] transition-all relative cursor-pointer active:scale-95 ${
                currentScreen === 'wishlist' ? 'text-[#b02f00] bg-[#ffdbd1]/50' : 'text-[#5b4039]'
              }`}
              title="Wishlist"
            >
              <span className="material-symbols-outlined text-2xl">favorite</span>
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#b02f00] text-white text-[10px] h-4 w-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Account button */}
            <button
              id="header-account-btn"
              onClick={() => onNavigate('account')}
              className={`p-2.5 rounded-full hover:bg-[#ebe7e7] transition-all cursor-pointer active:scale-95 ${
                currentScreen === 'account' ? 'text-[#b02f00] bg-[#ffdbd1]/50' : 'text-[#5b4039]'
              }`}
              title="My Account"
            >
              <span className="material-symbols-outlined text-2xl">person</span>
            </button>

            {/* Cart button */}
            <button
              id="header-cart-btn"
              onClick={onOpenCart}
              className="text-[#b02f00] bg-[#ffdbd1]/30 hover:bg-[#ffdbd1]/70 transition-all p-2.5 rounded-full active:scale-95 flex items-center justify-center relative cursor-pointer"
              title="Shopping Cart"
            >
              <span className="material-symbols-outlined text-2xl">shopping_cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#ff5722] text-white text-[11px] h-5 w-5 rounded-full flex items-center justify-center font-bold shadow-xs animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile TopAppBar */}
      <header id="mobile-header" className="w-full top-0 sticky z-40 bg-[#fcf9f8] shadow-xs border-b border-[#e4beb4]/60 md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(true)}
            className="text-[#5b4039] hover:bg-[#ebe7e7] transition-colors p-2 -ml-1 rounded-full active:scale-95"
            aria-label="Open Menu"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>

          <button
            onClick={() => onNavigate('home')}
            className="flex-1 flex justify-center items-center h-8 cursor-pointer focus:outline-none"
          >
            <img
              alt="CoreBuy Logo"
              className="h-7 w-auto object-contain mx-auto"
              src={LOGO_URL}
            />
          </button>

          <button
            id="mobile-cart-btn"
            onClick={onOpenCart}
            className="text-[#b02f00] hover:bg-[#ebe7e7] transition-colors p-2 -mr-1 rounded-full active:scale-95 relative"
            aria-label="Shopping Cart"
          >
            <span className="material-symbols-outlined text-2xl">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#ff5722] text-white text-[10px] h-4 w-4 rounded-full flex items-center justify-center font-bold border-2 border-[#fcf9f8]">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="px-4 pb-3 bg-[#fcf9f8]">
          <div className="relative w-full">
            <input
              id="mobile-search-input"
              className="w-full pl-10 pr-8 py-2 bg-[#f6f3f2] border border-[#e4beb4] rounded-full text-sm text-[#1c1b1b] placeholder:text-[#5b4039]/60 focus:outline-none focus:border-[#b02f00] focus:ring-1 focus:ring-[#b02f00] transition-all"
              placeholder="Search gear..."
              type="text"
              value={localSearch}
              onChange={(e) => {
                setLocalSearch(e.target.value);
                onSearchChange(e.target.value);
              }}
              onKeyDown={handleSearchKey}
            />
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#5b4039] text-xl pointer-events-none">
              search
            </span>
            {localSearch && (
              <button
                onClick={() => {
                  setLocalSearch('');
                  onSearchChange('');
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#5b4039]"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-xs bg-[#fcf9f8] h-full shadow-2xl z-10 flex flex-col p-5 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#e4beb4]/50 mb-4">
              <img alt="CoreBuy Logo" className="h-7 w-auto" src={LOGO_URL} />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-full text-[#5b4039] hover:bg-[#ebe7e7]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-1 flex-1">
              <p className="text-xs uppercase font-bold text-[#b02f00] tracking-wider px-3 mb-2">Categories</p>
              <button
                onClick={() => {
                  onNavigate('home');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-[#1c1b1b] hover:bg-[#ebe7e7] text-left"
              >
                <span className="material-symbols-outlined text-[#b02f00]">home</span>
                Home
              </button>
              <button
                onClick={() => {
                  onNavigate('shop', 'all');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-[#1c1b1b] hover:bg-[#ebe7e7] text-left"
              >
                <span className="material-symbols-outlined text-[#b02f00]">grid_view</span>
                All Products
              </button>
              {navCategories.map((item) => (
                <button
                  key={item.cat}
                  onClick={() => {
                    onNavigate('shop', item.cat);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#5b4039] hover:text-[#b02f00] hover:bg-[#ebe7e7] text-left"
                >
                  <span className="material-symbols-outlined text-base">chevron_right</span>
                  {item.label}
                </button>
              ))}

              <hr className="my-4 border-[#e4beb4]/50" />

              <p className="text-xs uppercase font-bold text-[#b02f00] tracking-wider px-3 mb-2">Account & Orders</p>
              <button
                onClick={() => {
                  onNavigate('account');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#1c1b1b] hover:bg-[#ebe7e7] text-left"
              >
                <span className="material-symbols-outlined text-[#006d2f]">person</span>
                My Profile & Orders
              </button>
              <button
                onClick={() => {
                  onNavigate('wishlist');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#1c1b1b] hover:bg-[#ebe7e7] text-left"
              >
                <span className="material-symbols-outlined text-[#b02f00]">favorite</span>
                Wishlist ({wishlistCount})
              </button>
            </div>

            <div className="pt-4 border-t border-[#e4beb4]/50 text-xs text-[#5b4039]">
              <p className="font-semibold text-[#1c1b1b]">Need Help?</p>
              <a
                href="https://wa.me/919876543210?text=Hi%20CoreBuy%2C%20I%20have%20a%20question%20about%20your%20products"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-xs text-[#006d2f] font-semibold"
              >
                <span className="material-symbols-outlined text-sm">chat</span>
                WhatsApp Customer Support
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
