import React from 'react';
import { Product, CategoryType, ViewScreen, CategoryItem } from '../types';
import { CATEGORIES_DATA, HERO_BANNER_IMG } from '../data/products';
import { ProductCard } from './ProductCard';

interface HomeScreenProps {
  products: Product[];
  categories?: CategoryItem[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
  wishlistIds: Set<string>;
  onToggleWishlist: (product: Product) => void;
  onNavigate: (screen: ViewScreen, category?: CategoryType) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  products,
  categories = CATEGORIES_DATA,
  onSelectProduct,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  onNavigate,
}) => {
  const displayCategories = categories && categories.length > 0 ? categories : CATEGORIES_DATA;
  const trendingProducts = products.some((p) => p.isTrending)
    ? products.filter((p) => p.isTrending)
    : products.slice(0, 4);

  return (
    <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-16 py-6 md:py-10 space-y-10 md:space-y-14">
      {/* Hero Banner Section */}
      <section id="hero-banner" className="relative w-full rounded-2xl overflow-hidden shadow-md h-[420px] md:h-[540px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
          style={{ backgroundImage: `url('${HERO_BANNER_IMG}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
        
        <div className="relative z-10 p-6 md:p-14 max-w-2xl text-white">
          <span className="inline-block bg-[#ff5722] text-white font-sans font-bold text-xs px-3.5 py-1 rounded-full uppercase tracking-widest mb-4 shadow-sm">
            New Collection 2026
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black italic tracking-tight mb-4 uppercase leading-[1.1]">
            Unleash <br />
            <span className="text-[#ffdbd1]">Your Speed</span>
          </h1>
          <p className="text-sm md:text-lg text-[#ebe7e7] mb-8 max-w-lg leading-relaxed">
            The new CoreBuy Pro collection is engineered for maximum performance, breathability, and ultimate speed. Dominate the field.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              id="hero-shop-btn"
              onClick={() => onNavigate('shop')}
              className="bg-[#b02f00] hover:bg-[#862200] text-white font-bold text-sm md:text-base px-8 py-3.5 rounded-lg transition-all active:scale-95 shadow-md flex items-center gap-2 cursor-pointer"
            >
              Shop Collection
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
            <button
              onClick={() => {
                const aeroTee = products.find((p) => p.id === 'corebuy-aerotee-orange') || products[0];
                if (aeroTee) onSelectProduct(aeroTee);
                else onNavigate('shop');
              }}
              className="bg-white/15 backdrop-blur-md hover:bg-white/25 text-white font-semibold text-sm md:text-base px-6 py-3.5 rounded-lg border border-white/30 transition-all active:scale-95 cursor-pointer"
            >
              View AeroTee (50% Off)
            </button>
          </div>
        </div>
      </section>

      {/* Shop by Category Horizontal Scroll */}
      <section id="categories-section">
        <div className="flex justify-between items-baseline mb-4">
          <h2 className="font-display font-bold text-xl md:text-2xl text-[#1c1b1b]">
            Shop by Category
          </h2>
          <button
            onClick={() => onNavigate('shop')}
            className="text-xs md:text-sm font-semibold text-[#b02f00] hover:underline cursor-pointer"
          >
            Explore All Categories →
          </button>
        </div>

        <div className="flex overflow-x-auto gap-4 md:gap-6 pb-2 no-scrollbar snap-x">
          {displayCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onNavigate('shop', cat.id)}
              className="snap-start flex flex-col items-center gap-2.5 min-w-[90px] md:min-w-[110px] group cursor-pointer text-center focus:outline-none"
            >
              <div className="w-[84px] h-[84px] md:w-[100px] md:h-[100px] rounded-full bg-[#f0edec] border-2 border-transparent group-hover:border-[#b02f00] group-hover:shadow-md transition-all flex items-center justify-center p-2.5 overflow-hidden">
                <img
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
                  src={cat.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1-woXXKDxPaizeinHfBxTUCxRcmqz5_QvhXhZn5DO1u3iNXfRIgEONPSW5OtlwgWok1c4oF7s9qtyWDel4ze-kU9JnQ9eot7HM7KskiygETvcB6_LDKW3WuXiAEUqkQxKahIVLCt4vEg8Kkye4753HQEHerxxYWehMBgCyMUKrOe3PFkxk7ycZVessJzmKxGRa_DIlJIqD-Pw5cLNGEOYAVYwQ8bVWe10HIaHdZqR8eals0_hzmg'}
                  alt={cat.label}
                />
              </div>
              <span className="text-xs md:text-sm font-semibold text-[#1c1b1b] group-hover:text-[#b02f00] transition-colors">
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Trending Now Product Grid */}
      <section id="trending-section">
        <div className="flex justify-between items-end mb-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#b02f00]">High Demand Gear</span>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-[#1c1b1b]">
              Trending Now
            </h2>
          </div>
          <button
            id="view-all-trending-btn"
            onClick={() => onNavigate('shop')}
            className="text-sm font-bold text-[#b02f00] hover:underline flex items-center gap-1 cursor-pointer"
          >
            View All ({products.length})
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {trendingProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onSelectProduct={onSelectProduct}
              onAddToCart={onAddToCart}
              isWishlisted={wishlistIds.has(prod.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      </section>

      {/* Special Feature Spotlight: CoreBuy Pro AeroTee */}
      <section className="bg-gradient-to-br from-[#ff5722] to-[#b02f00] rounded-2xl text-white p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-md">
        <div className="max-w-xl space-y-4">
          <span className="bg-black/20 text-[#ffdbd1] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Athlete Tested • Indian Summer Edition
          </span>
          <h3 className="font-display text-2xl md:text-4xl font-extrabold leading-tight">
            COREBUY PRO AEROTEE
          </h3>
          <p className="text-sm md:text-base text-white/90 leading-relaxed">
            Proprietary micro-weave fabric engineered for extreme heat. 50% lighter than standard tees with zero chafing seams.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <span className="font-display font-black text-3xl">₹1,499</span>
            <span className="text-lg line-through text-white/60">₹2,999</span>
            <span className="bg-[#006d2f] text-white text-xs font-bold px-2 py-1 rounded">50% OFF</span>
          </div>
          <div className="pt-2">
            <button
              onClick={() => {
                const aeroTee = products.find((p) => p.id === 'corebuy-aerotee-orange');
                if (aeroTee) onSelectProduct(aeroTee);
              }}
              className="bg-white text-[#b02f00] hover:bg-[#f6f3f2] font-bold text-sm px-6 py-3 rounded-lg shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              Order Now with Fast Delivery
            </button>
          </div>
        </div>
        <div className="w-48 md:w-72 aspect-square bg-white/10 backdrop-blur-xs rounded-2xl p-4 flex items-center justify-center">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZHPcBLg82LJOsZP62wF2zZ6dYzUU54qtRgqB8IsBY6vj9OL1r6ZIzn30R1khuv997HVs3CnxbZT5MU4sXSs6JPCGz_J8s3u9tGU-SCY99cbpg21gz7DMmIGuKWEcHi6JnZ-TR1SxCyzGRTAIQoDo08Fi-zoDplDq4Ga0y_soXWvFBNqcdjVQPo8J5gd-7l52ZrBKZkhaNPJfd4QoDiEZwsTSjZ90glw-xi1yNYaxEBgF2Wv_-6Kg"
            alt="CoreBuy Pro AeroTee Spotlight"
            className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform"
          />
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section id="trust-indicators" className="bg-[#f6f3f2] rounded-2xl p-6 md:p-8 border border-[#e4beb4]/40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-2xs border border-[#e4beb4]/20">
            <div className="bg-[#5dfd8a]/40 text-[#007232] p-3 rounded-full flex-shrink-0">
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#1c1b1b] mb-0.5">100% Original Products</h4>
              <p className="text-xs text-[#5b4039]">Guaranteed authenticity on all gear directly from brand makers.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-2xs border border-[#e4beb4]/20">
            <div className="bg-[#5dfd8a]/40 text-[#007232] p-3 rounded-full flex-shrink-0">
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                local_shipping
              </span>
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#1c1b1b] mb-0.5">Fast Shipping via Delhivery/DTDC</h4>
              <p className="text-xs text-[#5b4039]">Express 2-4 day delivery across 28,000+ pincodes in India.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-2xs border border-[#e4beb4]/20">
            <div className="bg-[#5dfd8a]/40 text-[#007232] p-3 rounded-full flex-shrink-0">
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                security
              </span>
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#1c1b1b] mb-0.5">Secure UPI & Card Payments</h4>
              <p className="text-xs text-[#5b4039]">100% safe checkout with Razorpay, Google Pay, PhonePe & COD.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
