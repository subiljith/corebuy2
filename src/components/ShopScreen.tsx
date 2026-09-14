import React, { useState, useMemo } from 'react';
import { Product, CategoryType, CategoryItem } from '../types';
import { CATEGORIES_DATA } from '../data/products';
import { ProductCard } from './ProductCard';

interface ShopScreenProps {
  products: Product[];
  categories?: CategoryItem[];
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  searchQuery: string;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
  wishlistIds: Set<string>;
  onToggleWishlist: (product: Product) => void;
}

export const ShopScreen: React.FC<ShopScreenProps> = ({
  products,
  categories = CATEGORIES_DATA,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSelectProduct,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
}) => {
  const displayCategories = categories && categories.length > 0 ? categories : CATEGORIES_DATA;
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'all') {
          const matchCatSlug = p.category === selectedCategory;
          const matchCatId = p.category_id === selectedCategory;
          if (!matchCatSlug && !matchCatId) {
            return false;
          }
        }
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = (p.name || '').toLowerCase().includes(q);
          const matchCat = (p.categoryLabel || '').toLowerCase().includes(q);
          const matchBrand = (p.brand || '').toLowerCase().includes(q);
          const matchDesc = (p.description || '').toLowerCase().includes(q);
          if (!matchName && !matchCat && !matchBrand && !matchDesc) {
            return false;
          }
        }
        // Discount filter
        if (onlyDiscounted && !p.discountPercent) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        const priceA = a.price ?? a.sale_price ?? 0;
        const priceB = b.price ?? b.sale_price ?? 0;
        const ratingA = a.rating ?? 0;
        const ratingB = b.rating ?? 0;
        if (sortBy === 'price-asc') return priceA - priceB;
        if (sortBy === 'price-desc') return priceB - priceA;
        if (sortBy === 'rating') return ratingB - ratingA;
        return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, onlyDiscounted, sortBy]);

  return (
    <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-16 py-6 md:py-10 space-y-8">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e4beb4]/50 pb-5">
        <div>
          <div className="text-xs uppercase font-bold text-[#b02f00] tracking-wider mb-1">
            CoreBuy India Catalog
          </div>
          <h1 className="font-display font-extrabold text-2xl md:text-3xl text-[#1c1b1b]">
            {selectedCategory === 'all'
              ? searchQuery
                ? `Search Results for "${searchQuery}"`
                : 'All Performance Gear'
              : displayCategories.find((c) => c.id === selectedCategory || c.slug === selectedCategory)?.label || 'Shop Gear'}
          </h1>
          <p className="text-xs md:text-sm text-[#5b4039] mt-1">
            Showing {filteredProducts.length} high-performance sports items
          </p>
        </div>

        {/* Sort and Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <label className="text-xs font-semibold text-[#5b4039] flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">sort</span>
            Sort:
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs font-medium bg-[#f6f3f2] border border-[#e4beb4] rounded-lg px-3 py-2 text-[#1c1b1b] focus:outline-none focus:border-[#b02f00]"
          >
            <option value="featured">Featured & Trending</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Customer Rated</option>
          </select>

          <button
            onClick={() => setOnlyDiscounted(!onlyDiscounted)}
            className={`text-xs font-semibold px-3 py-2 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
              onlyDiscounted
                ? 'bg-[#ba1a1a] text-white border-[#ba1a1a]'
                : 'bg-[#f6f3f2] text-[#5b4039] border-[#e4beb4] hover:border-[#b02f00]'
            }`}
          >
            <span className="material-symbols-outlined text-sm">local_offer</span>
            On Sale Only
          </button>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex overflow-x-auto gap-2.5 pb-2 no-scrollbar">
        <button
          onClick={() => onSelectCategory('all')}
          className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-[#b02f00] text-white shadow-xs'
              : 'bg-[#f0edec] text-[#5b4039] hover:bg-[#ebe7e7]'
          }`}
        >
          All Items ({products.length})
        </button>
        {displayCategories.map((cat) => {
          const count = products.filter((p) => p.category === cat.id || p.category === cat.slug).length;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-[#b02f00] text-white shadow-xs'
                  : 'bg-[#f0edec] text-[#5b4039] hover:bg-[#ebe7e7]'
              }`}
            >
              {cat.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Products Grid or Empty State */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              onAddToCart={onAddToCart}
              isWishlisted={wishlistIds.has(product.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-[#e4beb4]/40 max-w-lg mx-auto">
          <span className="material-symbols-outlined text-5xl text-[#5b4039]/50 mb-3">
            search_off
          </span>
          <h3 className="font-display font-bold text-lg text-[#1c1b1b]">No Products Found</h3>
          <p className="text-xs text-[#5b4039] mt-1 mb-6">
            We couldn't find any products matching your filters. Try resetting the category or search keywords.
          </p>
          <button
            onClick={() => {
              onSelectCategory('all');
              setOnlyDiscounted(false);
            }}
            className="bg-[#b02f00] text-white text-xs font-bold px-6 py-2.5 rounded-lg hover:bg-[#862200] transition-colors"
          >
            Clear Filters & View All
          </button>
        </div>
      )}
    </main>
  );
};
