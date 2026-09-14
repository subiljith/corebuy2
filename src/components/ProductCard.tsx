import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const availableSizes = product.sizes || [
    { label: 'S', available: true },
    { label: 'M', available: true },
    { label: 'L', available: true },
    { label: 'XL', available: true },
  ];

  const [selectedSize, setSelectedSize] = useState<string>(
    availableSizes.find((s) => s.available)?.label || availableSizes[0]?.label || 'Standard'
  );
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  const handleSizeClick = (e: React.MouseEvent, sizeLabel: string) => {
    e.stopPropagation();
    setSelectedSize(sizeLabel);
  };

  const displayImage = product.image || product.image_urls?.[0] || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZHPcBLg82LJOsZP62wF2zZ6dYzUU54qtRgqB8IsBY6vj9OL1r6ZIzn30R1khuv997HVs3CnxbZT5MU4sXSs6JPCGz_J8s3u9tGU-SCY99cbpg21gz7DMmIGuKWEcHi6JnZ-TR1SxCyzGRTAIQoDo08Fi-zoDplDq4Ga0y_soXWvFBNqcdjVQPo8J5gd-7l52ZrBKZkhaNPJfd4QoDiEZwsTSjZ90glw-xi1yNYaxEBgF2Wv_-6Kg';
  const displayPrice = product.price ?? product.sale_price ?? 0;
  const displayCategoryLabel = product.categoryLabel || product.category || 'Gear';

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => onSelectProduct(product)}
      className="bg-white rounded-lg shadow-xs border border-[#e4beb4]/30 hover:shadow-[0px_4px_20px_rgba(0,0,0,0.06)] hover:border-[#e4beb4] transition-all duration-200 group relative flex flex-col cursor-pointer overflow-hidden"
    >
      {/* Badge (Discount or Bestseller) */}
      {product.badge && (
        <div
          className={`absolute top-2.5 left-2.5 z-10 font-sans text-[10px] px-2 py-0.5 rounded-sm uppercase font-bold tracking-wide ${
            product.badgeType === 'bestseller'
              ? 'bg-[#0070eb] text-white'
              : 'bg-[#ba1a1a] text-white'
          }`}
        >
          {product.badge}
        </div>
      )}

      {/* Wishlist Button */}
      <button
        id={`wishlist-btn-${product.id}`}
        onClick={handleWishlistClick}
        className={`absolute top-2.5 right-2.5 z-10 transition-colors p-1.5 bg-white/80 backdrop-blur-xs rounded-full hover:bg-white active:scale-90 ${
          isWishlisted ? 'text-[#ba1a1a]' : 'text-[#5b4039] hover:text-[#b02f00]'
        }`}
        aria-label="Wishlist toggle"
      >
        <span
          className="material-symbols-outlined text-lg leading-none"
          style={isWishlisted ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          favorite
        </span>
      </button>

      {/* Image Thumbnail Container */}
      <div className="bg-[#F1F3F5] rounded-t-lg p-4 flex justify-center items-center aspect-square overflow-hidden relative">
        <img
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 mix-blend-multiply"
          src={displayImage}
          alt={product.name}
          loading="lazy"
        />
      </div>

      {/* Product Content Details */}
      <div className="p-3 md:p-4 flex flex-col flex-grow">
        <div className="text-xs font-semibold text-[#5b4039] uppercase tracking-wider mb-1">
          {displayCategoryLabel}
        </div>

        <h3 className="font-semibold text-sm md:text-base text-[#1c1b1b] leading-snug mb-2 flex-grow line-clamp-2 group-hover:text-[#b02f00] transition-colors">
          {product.name}
        </h3>

        {/* Price display */}
        <div className="flex items-baseline gap-2 mb-2.5">
          <span className="font-display font-bold text-lg md:text-xl text-[#1c1b1b]">
            ₹{displayPrice.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-[#5b4039] line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
          {product.discountPercent && (
            <span className="text-[10px] font-bold text-[#006d2f] bg-[#5dfd8a]/30 px-1.5 py-0.5 rounded">
              {product.discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Size Selection Pills */}
        <div className="flex flex-wrap gap-1 mb-3">
          {availableSizes.map((size) => (
            <button
              key={size.label}
              disabled={!size.available}
              onClick={(e) => handleSizeClick(e, size.label)}
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium transition-all ${
                !size.available
                  ? 'border border-[#e5e2e1] text-[#5b4039]/40 line-through cursor-not-allowed'
                  : selectedSize === size.label
                  ? 'bg-[#b02f00] text-white border border-[#b02f00]'
                  : 'border border-[#e4beb4] text-[#5b4039] hover:border-[#b02f00]'
              }`}
            >
              {size.label}
            </button>
          ))}
        </div>

        {/* Add to Cart CTA */}
        <button
          id={`add-to-cart-${product.id}`}
          onClick={handleAddToCart}
          className={`w-full mt-auto font-sans font-semibold text-xs py-2.5 px-3 rounded transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer ${
            justAdded
              ? 'bg-[#006d2f] text-white border-2 border-[#006d2f]'
              : 'bg-transparent border-2 border-[#b02f00] text-[#b02f00] hover:bg-[#b02f00] hover:text-white'
          }`}
        >
          {justAdded ? (
            <>
              <span className="material-symbols-outlined text-sm">check</span>
              Added to Cart!
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-sm">shopping_bag</span>
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};
