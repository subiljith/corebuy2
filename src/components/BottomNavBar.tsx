import React from 'react';
import { ViewScreen } from '../types';

interface BottomNavBarProps {
  currentScreen: ViewScreen;
  onNavigate: (screen: ViewScreen) => void;
  cartCount: number;
  wishlistCount: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentScreen,
  onNavigate,
  cartCount,
}) => {
  return (
    <nav
      id="mobile-bottom-nav"
      className="fixed bottom-0 left-0 w-full z-50 rounded-t-2xl shadow-[0px_-4px_20px_rgba(0,0,0,0.06)] bg-[#fcf9f8] border-t border-[#e4beb4]/40 md:hidden flex justify-around items-center py-2 px-3 pb-safe"
    >
      {/* Home */}
      <button
        id="bottom-nav-home"
        onClick={() => onNavigate('home')}
        className={`flex flex-col items-center justify-center rounded-xl px-3 py-1 active:translate-y-[-2px] transition-all cursor-pointer ${
          currentScreen === 'home'
            ? 'text-[#b02f00] bg-[#5dfd8a]/20 font-semibold'
            : 'text-[#5b4039] hover:bg-[#f0edec]'
        }`}
      >
        <span
          className="material-symbols-outlined mb-0.5 text-2xl"
          style={currentScreen === 'home' ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          home
        </span>
        <span className="text-[11px]">Home</span>
      </button>

      {/* Shop */}
      <button
        id="bottom-nav-shop"
        onClick={() => onNavigate('shop')}
        className={`flex flex-col items-center justify-center rounded-xl px-3 py-1 active:translate-y-[-2px] transition-all cursor-pointer ${
          currentScreen === 'shop' || currentScreen === 'product-detail'
            ? 'text-[#b02f00] bg-[#5dfd8a]/20 font-semibold'
            : 'text-[#5b4039] hover:bg-[#f0edec]'
        }`}
      >
        <span
          className="material-symbols-outlined mb-0.5 text-2xl"
          style={currentScreen === 'shop' || currentScreen === 'product-detail' ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          search
        </span>
        <span className="text-[11px]">Shop</span>
      </button>

      {/* Wishlist */}
      <button
        id="bottom-nav-wishlist"
        onClick={() => onNavigate('wishlist')}
        className={`flex flex-col items-center justify-center rounded-xl px-3 py-1 active:translate-y-[-2px] transition-all cursor-pointer ${
          currentScreen === 'wishlist'
            ? 'text-[#b02f00] bg-[#5dfd8a]/20 font-semibold'
            : 'text-[#5b4039] hover:bg-[#f0edec]'
        }`}
      >
        <span
          className="material-symbols-outlined mb-0.5 text-2xl"
          style={currentScreen === 'wishlist' ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          favorite
        </span>
        <span className="text-[11px]">Wishlist</span>
      </button>

      {/* Account */}
      <button
        id="bottom-nav-account"
        onClick={() => onNavigate('account')}
        className={`flex flex-col items-center justify-center rounded-xl px-3 py-1 active:translate-y-[-2px] transition-all cursor-pointer ${
          currentScreen === 'account'
            ? 'text-[#b02f00] bg-[#5dfd8a]/20 font-semibold'
            : 'text-[#5b4039] hover:bg-[#f0edec]'
        }`}
      >
        <span
          className="material-symbols-outlined mb-0.5 text-2xl"
          style={currentScreen === 'account' ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          person
        </span>
        <span className="text-[11px]">Account</span>
      </button>

      {/* Cart */}
      <button
        id="bottom-nav-cart"
        onClick={() => onNavigate('checkout')}
        className={`flex flex-col items-center justify-center rounded-xl px-3 py-1 active:translate-y-[-2px] transition-all cursor-pointer relative ${
          currentScreen === 'checkout'
            ? 'text-[#b02f00] bg-[#5dfd8a]/20 font-semibold'
            : 'text-[#5b4039] hover:bg-[#f0edec]'
        }`}
      >
        <span
          className="material-symbols-outlined mb-0.5 text-2xl"
          style={currentScreen === 'checkout' ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          shopping_bag
        </span>
        <span className="text-[11px]">Cart</span>
        {cartCount > 0 && (
          <span className="absolute top-0 right-1 bg-[#b02f00] text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-[#fcf9f8]">
            {cartCount}
          </span>
        )}
      </button>
    </nav>
  );
};
