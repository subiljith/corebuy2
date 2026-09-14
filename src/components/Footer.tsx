import React, { useState } from 'react';
import { ViewScreen } from '../types';

interface FooterProps {
  onNavigate: (screen: ViewScreen) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [clickCount, setClickCount] = useState(0);

  // Secret 3-click trigger on copyright to open Admin
  const handleSecretClick = () => {
    setClickCount((prev) => {
      const next = prev + 1;
      if (next >= 3) {
        onNavigate('admin');
        return 0;
      }
      return next;
    });
    setTimeout(() => setClickCount(0), 1200);
  };

  return (
    <footer id="main-footer" className="w-full mt-auto bg-[#f0edec] border-t border-[#e4beb4]/50 px-6 md:px-16 py-12 md:py-16 mb-16 md:mb-0">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between gap-8 md:gap-12">
        {/* Brand statement */}
        <div className="flex flex-col items-start gap-3 max-w-sm">
          <span className="font-display text-2xl md:text-3xl tracking-tighter text-[#b02f00] italic font-black">
            COREBUY
          </span>
          <p className="text-sm text-[#5b4039] leading-relaxed">
            Your premier destination for high-performance athletic gear in India. Train harder, run faster with CoreBuy.
          </p>
          <div className="flex items-center gap-3 mt-2 text-xs text-[#006d2f] font-semibold bg-[#5dfd8a]/20 px-3 py-1.5 rounded-full">
            <span className="material-symbols-outlined text-base">verified</span>
            Official India Distributor & Retailer
          </div>
        </div>

        {/* Customer Care & Policies */}
        <div className="flex flex-wrap gap-x-12 gap-y-6">
          <div className="flex flex-col gap-2.5">
            <span className="text-xs uppercase tracking-wider font-bold text-[#1c1b1b]">Customer Care</span>
            <button onClick={() => onNavigate('account')} className="text-sm text-[#5b4039] hover:text-[#b02f00] hover:underline text-left transition-all">
              Track Order
            </button>
            <a href="#payment-policy" className="text-sm text-[#5b4039] hover:text-[#b02f00] hover:underline transition-all">
              Secure Payment
            </a>
            <a href="#genuine" className="text-sm text-[#5b4039] hover:text-[#b02f00] hover:underline transition-all">
              Genuine Products
            </a>
            <a href="#returns" className="text-sm text-[#5b4039] hover:text-[#b02f00] hover:underline transition-all">
              Easy 7-Day Returns
            </a>
            <a href="#shipping" className="text-sm text-[#5b4039] hover:text-[#b02f00] hover:underline transition-all">
              Shipping Policy
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#006d2f] font-medium hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">chat</span> Contact Us on WhatsApp
            </a>
          </div>

          <div className="flex flex-col gap-2.5">
            <span className="text-xs uppercase tracking-wider font-bold text-[#1c1b1b]">Shop Categories</span>
            <button onClick={() => onNavigate('shop')} className="text-sm text-[#5b4039] hover:text-[#b02f00] hover:underline text-left transition-all">
              Running Shoes
            </button>
            <button onClick={() => onNavigate('shop')} className="text-sm text-[#5b4039] hover:text-[#b02f00] hover:underline text-left transition-all">
              Training Apparel
            </button>
            <button onClick={() => onNavigate('shop')} className="text-sm text-[#5b4039] hover:text-[#b02f00] hover:underline text-left transition-all">
              Gym Accessories
            </button>
            <button onClick={() => onNavigate('shop')} className="text-sm text-[#5b4039] hover:text-[#b02f00] hover:underline text-left transition-all">
              Cricket & Sports Gear
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="w-full md:w-auto mt-4 md:mt-0 text-left md:text-right self-end">
          <p
            onClick={handleSecretClick}
            className="text-sm text-[#5b4039] cursor-default select-none"
            title=""
          >
            © {new Date().getFullYear()} CoreBuy India. All Rights Reserved.
          </p>
          <p className="text-xs text-[#5b4039]/70 mt-1">
            Engineered for performance athletes across Bharat.
          </p>
        </div>
      </div>
    </footer>
  );
};
