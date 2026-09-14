import React, { useState } from 'react';
import { Product } from '../types';

interface ProductDetailScreenProps {
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
  onDirectBuy: (product: Product, size: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
  allProducts: Product[];
  onOpenSizeGuide: () => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  product,
  onAddToCart,
  onDirectBuy,
  isWishlisted,
  onToggleWishlist,
  onBack,
  onSelectProduct,
  allProducts,
  onOpenSizeGuide,
}) => {
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);

  const availableSizes = product.sizes && product.sizes.length > 0 ? product.sizes : [
    { label: 'S', available: true },
    { label: 'M', available: true },
    { label: 'L', available: true },
    { label: 'XL', available: true },
  ];

  const mainImage = product.image || product.image_urls?.[0] || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZHPcBLg82LJOsZP62wF2zZ6dYzUU54qtRgqB8IsBY6vj9OL1r6ZIzn30R1khuv997HVs3CnxbZT5MU4sXSs6JPCGz_J8s3u9tGU-SCY99cbpg21gz7DMmIGuKWEcHi6JnZ-TR1SxCyzGRTAIQoDo08Fi-zoDplDq4Ga0y_soXWvFBNqcdjVQPo8J5gd-7l52ZrBKZkhaNPJfd4QoDiEZwsTSjZ90glw-xi1yNYaxEBgF2Wv_-6Kg';

  const galleryItems = product.gallery && product.gallery.length > 0 ? product.gallery : [
    { url: mainImage, alt: product.name }
  ];

  const [selectedSize, setSelectedSize] = useState<string>(
    availableSizes.find((s) => s.available)?.label || availableSizes[0]?.label || 'M'
  );
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const currentGalleryItem = galleryItems[selectedImgIndex] || galleryItems[0] || {
    url: mainImage,
    alt: product.name,
  };

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleBuyNow = () => {
    onDirectBuy(product, selectedSize);
  };

  const displayPrice = product.price ?? product.sale_price ?? 0;
  const displayCategoryLabel = product.categoryLabel || product.category || 'Gear';
  const displayDescription = product.description || 'High performance athletic gear engineered for maximum breathability and durability.';
  const displayFabricCare = product.fabricCare && product.fabricCare.length > 0 ? product.fabricCare : ['88% Polyester, 12% Elastane', 'Machine wash cold with like colors', 'Tumble dry low'];
  const displayReplacement = product.replacementPolicy || '7-day hassle-free replacement policy on all unworn items.';

  const generateWhatsAppLink = () => {
    const message = encodeURIComponent(
      `Hello CoreBuy India Team! I would like to order:\n\n*Product:* ${product.name}\n*Price:* ₹${product.price}\n*Size:* ${selectedSize}\n*Product ID:* ${product.id}\n\nPlease confirm availability and payment link for express delivery.`
    );
    return `https://wa.me/919876543210?text=${message}`;
  };

  const relatedProducts = allProducts.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 md:px-16 py-6 md:py-10 pb-28 md:pb-16">
      {/* Navigation Breadcrumb / Back button */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-xs md:text-sm font-semibold text-[#5b4039] hover:text-[#b02f00] transition-colors cursor-pointer group"
        >
          <span className="material-symbols-outlined text-lg group-hover:-translate-x-0.5 transition-transform">
            arrow_back
          </span>
          Back to Gear
        </button>

        <button
          onClick={() => onToggleWishlist(product)}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
            isWishlisted
              ? 'bg-[#ffdbd1]/50 border-[#ba1a1a] text-[#ba1a1a]'
              : 'bg-[#f6f3f2] border-[#e4beb4] text-[#5b4039] hover:border-[#b02f00]'
          }`}
        >
          <span
            className="material-symbols-outlined text-base"
            style={isWishlisted ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            favorite
          </span>
          {isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}
        </button>
      </div>

      {/* Main Grid: Gallery Area (Left) & Product Details (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
        {/* Image Gallery Area */}
        <div className="md:col-span-6 lg:col-span-7 flex flex-col gap-4">
          {/* Hero Large Image */}
          <div className="bg-[#F1F3F5] rounded-2xl overflow-hidden aspect-square md:aspect-[4/5] relative group shadow-2xs flex items-center justify-center p-6">
            <img
              alt={currentGalleryItem.alt || product.name}
              className="w-full h-full object-contain mix-blend-multiply transition-all duration-300 group-hover:scale-105"
              src={currentGalleryItem.url}
            />
            {product.badge && (
              <div className="absolute top-4 left-4 bg-[#ba1a1a] text-white font-sans text-xs px-3.5 py-1 rounded-full uppercase tracking-wider font-bold shadow-xs">
                {product.badge}
              </div>
            )}
            {product.discountPercent && (
              <div className="absolute top-4 right-4 bg-[#006d2f] text-white font-sans text-xs font-bold px-2.5 py-1 rounded-full shadow-xs">
                {product.discountPercent}% OFF
              </div>
            )}
          </div>

          {/* Thumbnails Row */}
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
            {galleryItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (item.type === 'video') {
                    setIsVideoModalOpen(true);
                  } else {
                    setSelectedImgIndex(idx);
                  }
                }}
                className={`bg-[#F1F3F5] rounded-xl overflow-hidden aspect-square border-2 transition-all p-1 flex items-center justify-center relative cursor-pointer ${
                  selectedImgIndex === idx && item.type !== 'video'
                    ? 'border-[#b02f00] ring-2 ring-[#b02f00]/30 shadow-xs'
                    : 'border-transparent hover:border-[#e4beb4]'
                }`}
              >
                <img
                  alt={item.alt || product.name}
                  className="w-full h-full object-contain mix-blend-multiply"
                  src={item.url}
                />
                {item.type === 'video' && (
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
                    <span className="material-symbols-outlined text-2xl animate-pulse">play_circle</span>
                    <span className="text-[9px] font-bold uppercase tracking-wider">Demo</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Product Info Area */}
        <div className="md:col-span-6 lg:col-span-5 flex flex-col gap-6">
          {/* Category Tag & Rating */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="font-sans font-bold text-xs text-[#b02f00] uppercase tracking-widest">
                {displayCategoryLabel}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-[#5b4039]">
                <span
                  className="material-symbols-outlined text-[#FFC107] text-lg"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span className="font-semibold text-[#1c1b1b]">{product.rating || 4.8}</span>
                <span>({product.reviewsCount || 42} Reviews)</span>
              </div>
            </div>

            <h1 className="font-display font-black text-2xl md:text-3xl text-[#1c1b1b] uppercase tracking-tight leading-tight">
              {product.name}
            </h1>
            <p className="text-xs text-[#5b4039]">
              Color: <span className="font-semibold text-[#1c1b1b]">{product.color || 'Standard'}</span> • SKU: CB-{product.id.slice(0, 6).toUpperCase()}
            </p>
          </div>

          {/* Price Block */}
          <div className="flex items-baseline gap-3 border-b border-[#e4beb4]/50 pb-5">
            <span className="font-display font-extrabold text-3xl md:text-4xl text-[#1c1b1b]">
              ₹{displayPrice.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="font-display text-lg text-[#5b4039] line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            {product.discountPercent && (
              <span className="font-sans text-xs font-bold text-[#007232] bg-[#5dfd8a] px-2.5 py-1 rounded-md shadow-2xs">
                {product.discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Size Selector */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h3 className="font-sans font-bold text-sm text-[#1c1b1b]">Select Size</h3>
              <button
                onClick={onOpenSizeGuide}
                className="text-xs font-semibold text-[#b02f00] underline hover:text-[#862200] cursor-pointer flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">straighten</span>
                Size Guide
              </button>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {availableSizes.map((size) => {
                const isSelected = selectedSize === size.label;
                if (!size.available) {
                  return (
                    <button
                      key={size.label}
                      disabled
                      className="flex flex-col items-center justify-center w-14 h-14 rounded-full border border-[#e5e2e1] text-[#5b4039]/40 cursor-not-allowed bg-[#f0edec] relative overflow-hidden"
                      title="Out of stock"
                    >
                      <span className="font-sans font-bold text-sm z-10">{size.label}</span>
                      <div className="absolute w-full h-[1.5px] bg-[#ba1a1a]/50 rotate-45 z-0" />
                    </button>
                  );
                }

                return (
                  <button
                    key={size.label}
                    onClick={() => setSelectedSize(size.label)}
                    className={`flex flex-col items-center justify-center w-14 h-14 rounded-full transition-all relative overflow-hidden group cursor-pointer ${
                      isSelected
                        ? 'border-2 border-[#b02f00] bg-[#b02f00] text-white shadow-sm -translate-y-0.5'
                        : 'border border-[#e4beb4] hover:border-[#b02f00] text-[#5b4039] hover:text-[#b02f00] bg-white'
                    }`}
                  >
                    <span className="font-sans font-bold text-sm z-10">{size.label}</span>
                    {size.note && (
                      <span
                        className={`absolute bottom-1 font-sans text-[7.5px] font-bold z-10 ${
                          isSelected ? 'text-white/90' : 'text-[#ba1a1a]'
                        }`}
                      >
                        {size.note}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-[#5b4039]">
              Selected Size: <span className="font-bold text-[#1c1b1b]">{selectedSize}</span> (Standard Indian Fit)
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col gap-3 pt-2">
            <div className="flex gap-3">
              <button
                id="pdp-add-to-cart-btn"
                onClick={handleAddToCart}
                className={`flex-1 bg-white border-2 border-[#b02f00] text-[#b02f00] font-sans font-bold text-sm py-4 rounded-lg hover:bg-[#ffdbd1]/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
                  addedAnimation ? 'bg-[#006d2f]! text-white! border-[#006d2f]!' : ''
                }`}
              >
                <span className="material-symbols-outlined text-xl">
                  {addedAnimation ? 'check' : 'shopping_bag'}
                </span>
                {addedAnimation ? 'ADDED TO CART' : 'ADD TO CART'}
              </button>

              <button
                id="pdp-buy-now-btn"
                onClick={handleBuyNow}
                className="flex-1 bg-[#b02f00] hover:bg-[#862200] text-white font-sans font-bold text-sm py-4 rounded-lg shadow-sm hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
              >
                BUY NOW
              </button>
            </div>

            {/* WhatsApp Direct Order CTA */}
            <a
              id="pdp-whatsapp-btn"
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-sans font-bold text-sm py-4 rounded-lg shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"></path>
              </svg>
              ORDER VIA WHATSAPP
            </a>
          </div>

          {/* Trust Badges Trio */}
          <div className="grid grid-cols-3 gap-2 border-y border-[#e4beb4]/50 py-4 mt-2 text-center">
            <div className="flex flex-col items-center gap-1.5">
              <span
                className="material-symbols-outlined text-[#25D366] text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified_user
              </span>
              <span className="text-[11px] font-semibold text-[#5b4039] leading-tight">
                Genuine<br />Product
              </span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <span
                className="material-symbols-outlined text-[#25D366] text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_shipping
              </span>
              <span className="text-[11px] font-semibold text-[#5b4039] leading-tight">
                Fast<br />Delivery
              </span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <span
                className="material-symbols-outlined text-[#25D366] text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                currency_rupee
              </span>
              <span className="text-[11px] font-semibold text-[#5b4039] leading-tight">
                Secure<br />Payment
              </span>
            </div>
          </div>

          {/* Accordion List */}
          <div className="flex flex-col divide-y divide-[#e4beb4]/40">
            {/* Description */}
            <details className="group py-3.5" open>
              <summary className="flex justify-between items-center text-xs font-bold text-[#1c1b1b] uppercase tracking-wider cursor-pointer list-none">
                PRODUCT DESCRIPTION
                <span className="material-symbols-outlined transition-transform group-open:rotate-180 text-lg">
                  keyboard_arrow_down
                </span>
              </summary>
              <div className="pt-3 text-sm text-[#5b4039] leading-relaxed">
                {displayDescription}
              </div>
            </details>

            {/* Fabric & Care */}
            <details className="group py-3.5">
              <summary className="flex justify-between items-center text-xs font-bold text-[#1c1b1b] uppercase tracking-wider cursor-pointer list-none">
                FABRIC &amp; CARE
                <span className="material-symbols-outlined transition-transform group-open:rotate-180 text-lg">
                  keyboard_arrow_down
                </span>
              </summary>
              <div className="pt-3 text-sm text-[#5b4039]">
                <ul className="list-disc pl-5 space-y-1.5">
                  {displayFabricCare.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </details>

            {/* Replacement Policy */}
            <details className="group py-3.5">
              <summary className="flex justify-between items-center text-xs font-bold text-[#1c1b1b] uppercase tracking-wider cursor-pointer list-none">
                7-DAY REPLACEMENT POLICY
                <span className="material-symbols-outlined transition-transform group-open:rotate-180 text-lg">
                  keyboard_arrow_down
                </span>
              </summary>
              <div className="pt-3 text-sm text-[#5b4039] leading-relaxed">
                {displayReplacement}
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 pt-10 border-t border-[#e4beb4]/40">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-display font-bold text-xl md:text-2xl text-[#1c1b1b]">
              Complete Your Performance Kit
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((p) => {
              const pImg = p.image || p.image_urls?.[0] || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZHPcBLg82LJOsZP62wF2zZ6dYzUU54qtRgqB8IsBY6vj9OL1r6ZIzn30R1khuv997HVs3CnxbZT5MU4sXSs6JPCGz_J8s3u9tGU-SCY99cbpg21gz7DMmIGuKWEcHi6JnZ-TR1SxCyzGRTAIQoDo08Fi-zoDplDq4Ga0y_soXWvFBNqcdjVQPo8J5gd-7l52ZrBKZkhaNPJfd4QoDiEZwsTSjZ90glw-xi1yNYaxEBgF2Wv_-6Kg';
              const pPrice = p.price ?? p.sale_price ?? 0;
              const pCat = p.categoryLabel || p.category || 'Gear';
              return (
                <div
                  key={p.id}
                  onClick={() => {
                    onSelectProduct(p);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white rounded-lg p-3 border border-[#e4beb4]/30 hover:border-[#b02f00] hover:shadow-xs transition-all cursor-pointer flex flex-col"
                >
                  <div className="bg-[#F1F3F5] rounded-md aspect-square p-2 flex items-center justify-center mb-2">
                    <img src={pImg} alt={p.name} className="w-full h-full object-contain mix-blend-multiply" />
                  </div>
                  <span className="text-[10px] font-bold uppercase text-[#b02f00]">{pCat}</span>
                  <h4 className="text-xs font-semibold text-[#1c1b1b] line-clamp-1 mt-0.5">{p.name}</h4>
                  <div className="mt-2 font-bold text-sm text-[#1c1b1b]">₹{pPrice.toLocaleString('en-IN')}</div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Video Modal Demo */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-[#1c1b1b] text-white rounded-2xl max-w-lg w-full p-6 relative shadow-2xl">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
            <h3 className="font-display font-bold text-lg mb-4 text-[#ffdbd1]">
              {product.name} • Sprint & Agility Test
            </h3>
            <div className="aspect-video bg-black rounded-xl overflow-hidden relative flex items-center justify-center">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4Kue1Xom6SG_WwoCsTpq-euyZnDglAbEKOVKE5FaJlOMfrbfXR2ojTjoMTFmuEIPmQOuVL0aCWi_wJ_0tt7CpHq--p9p4RX5PjtYp2kKKpxZ8pnvCVt8vQ5_B2w917hbo6aM_COXffXOI-E2T9efnShUReruoCDPnZ0oQ5iv3GScSIGW-zwmmEVLsV0v-ZO35yp1LpbPxq7wrzDHIY_P-ZsNYLDVEXamS9RNanFo9AqEUMPdcPEc"
                alt="Sprint test video"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center p-4 text-center">
                <span className="material-symbols-outlined text-5xl text-[#25D366] mb-2 animate-bounce">
                  play_circle
                </span>
                <p className="text-xs font-semibold uppercase tracking-wider text-white">
                  Dynamic Motion & Elasticity Demo
                </p>
                <p className="text-[11px] text-white/80 mt-1 max-w-xs">
                  Zero chafing seam test recorded at 34°C with national level sprinters.
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="bg-[#b02f00] text-white text-xs font-bold px-4 py-2 rounded-lg"
              >
                Close Demo
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
