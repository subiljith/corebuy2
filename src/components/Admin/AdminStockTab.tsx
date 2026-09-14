import React, { useState } from 'react';
import { Product } from '../../types';

interface AdminStockTabProps {
  products: Product[];
  onUpdateProductStock: (productId: string, sizeLabel: string, newQuantity: number) => Promise<void>;
  isUpdating: boolean;
}

export const AdminStockTab: React.FC<AdminStockTabProps> = ({
  products,
  onUpdateProductStock,
  isUpdating,
}) => {
  const [search, setSearch] = useState('');
  const [stockFilter, setStockFilter] = useState<'all' | 'low' | 'out'>('all');
  const [updatingKey, setUpdatingKey] = useState<string | null>(null);

  const handleStockChange = async (productId: string, sizeLabel: string, nextQty: number) => {
    const safeQty = Math.max(0, nextQty);
    setUpdatingKey(`${productId}-${sizeLabel}`);
    try {
      await onUpdateProductStock(productId, sizeLabel, safeQty);
    } finally {
      setUpdatingKey(null);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchSearch =
      !search.trim() ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.categoryLabel || '').toLowerCase().includes(search.toLowerCase());

    if (!matchSearch) return false;

    if (stockFilter === 'low') {
      return (p.sizes || []).some((s) => s.available && (s.note === 'Few Left'));
    }
    if (stockFilter === 'out') {
      return (p.sizes || []).some((s) => !s.available);
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-[#e4beb4]/40 shadow-2xs">
        <div>
          <h2 className="font-display font-bold text-lg text-[#1c1b1b]">Stock &amp; Inventory Control</h2>
          <p className="text-xs text-[#5b4039]">
            Adjust stock for any size in 1 click without touching database tables.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:w-60">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#5b4039] text-lg pointer-events-none">
              search
            </span>
            <input
              type="text"
              placeholder="Search gear inventory..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#f6f3f2] border border-[#e4beb4] rounded-xl text-xs text-[#1c1b1b] focus:outline-none focus:border-[#b02f00]"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-[#f6f3f2] p-1 rounded-xl border border-[#e4beb4]">
            <button
              onClick={() => setStockFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                stockFilter === 'all' ? 'bg-[#b02f00] text-white shadow-xs' : 'text-[#5b4039]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStockFilter('low')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                stockFilter === 'low' ? 'bg-[#ff9800] text-white shadow-xs' : 'text-[#5b4039]'
              }`}
            >
              Low Stock
            </button>
            <button
              onClick={() => setStockFilter('out')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                stockFilter === 'out' ? 'bg-[#ba1a1a] text-white shadow-xs' : 'text-[#5b4039]'
              }`}
            >
              Out of Stock
            </button>
          </div>
        </div>
      </div>

      {/* Stock Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredProducts.length === 0 ? (
          <div className="md:col-span-2 bg-white rounded-2xl p-12 text-center border border-[#e4beb4]/40 text-[#5b4039]">
            <span className="material-symbols-outlined text-4xl mb-2 opacity-50">inventory</span>
            <p className="text-xs">No products found for this inventory filter.</p>
          </div>
        ) : (
          filteredProducts.map((product) => {
            const img =
              product.image ||
              product.image_urls?.[0] ||
              'https://lh3.googleusercontent.com/aida-public/AB6AXuDZHPcBLg82LJOsZP62wF2zZ6dYzUU54qtRgqB8IsBY6vj9OL1r6ZIzn30R1khuv997HVs3CnxbZT5MU4sXSs6JPCGz_J8s3u9tGU-SCY99cbpg21gz7DMmIGuKWEcHi6JnZ-TR1SxCyzGRTAIQoDo08Fi-zoDplDq4Ga0y_soXWvFBNqcdjVQPo8J5gd-7l52ZrBKZkhaNPJfd4QoDiEZwsTSjZ90glw-xi1yNYaxEBgF2Wv_-6Kg';

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl p-5 border border-[#e4beb4]/40 shadow-2xs space-y-4 hover:border-[#b02f00]/40 transition-all"
              >
                {/* Product Header */}
                <div className="flex items-center gap-3.5 pb-3 border-b border-[#ebe7e7]">
                  <img
                    src={img}
                    alt={product.name}
                    className="w-14 h-14 rounded-xl object-contain bg-[#F1F3F5] p-1.5 border border-[#ebe7e7] shrink-0 mix-blend-multiply"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold uppercase text-[#b02f00] tracking-wider">
                      {product.categoryLabel || product.category}
                    </span>
                    <h3 className="font-bold text-sm text-[#1c1b1b] truncate">{product.name}</h3>
                    <p className="text-xs text-[#5b4039] font-medium">₹{product.price.toLocaleString('en-IN')}</p>
                  </div>
                </div>

                {/* Sizes Stock Rows */}
                <div className="space-y-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#5b4039] block">
                    Sizes &amp; Quantity
                  </span>

                  {(product.sizes || []).length === 0 ? (
                    <p className="text-xs text-[#5b4039] italic">No sizes specified</p>
                  ) : (
                    (product.sizes || []).map((size) => {
                      const key = `${product.id}-${size.label}`;
                      const isPending = updatingKey === key;
                      // Approximate quantity based on available flag & note
                      const estimatedQty = !size.available ? 0 : size.note === 'Few Left' ? 2 : 15;

                      return (
                        <div
                          key={size.label}
                          className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-[#fcf9f8] border border-[#e4beb4]/30"
                        >
                          {/* Size label & status badge */}
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-white border border-[#e4beb4] flex items-center justify-center font-bold text-xs text-[#1c1b1b]">
                              {size.label}
                            </div>
                            <div>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  !size.available
                                    ? 'bg-[#ba1a1a] text-white'
                                    : size.note === 'Few Left'
                                    ? 'bg-[#ff9800]/20 text-[#e65100]'
                                    : 'bg-[#5dfd8a]/40 text-[#007232]'
                                }`}
                              >
                                {!size.available ? 'Out of Stock' : size.note === 'Few Left' ? 'Low Stock' : 'In Stock'}
                              </span>
                            </div>
                          </div>

                          {/* Quick Adjuster Controls */}
                          <div className="flex items-center gap-2">
                            {/* Fast Action Buttons */}
                            {size.available ? (
                              <button
                                onClick={() => handleStockChange(product.id, size.label, 0)}
                                disabled={isPending}
                                className="text-[10px] font-semibold text-[#ba1a1a] hover:bg-[#ba1a1a]/10 px-2 py-1 rounded transition-colors cursor-pointer"
                                title="Mark as Out of Stock"
                              >
                                Mark Out
                              </button>
                            ) : (
                              <button
                                onClick={() => handleStockChange(product.id, size.label, 10)}
                                disabled={isPending}
                                className="text-[10px] font-semibold text-[#007232] bg-[#5dfd8a]/30 hover:bg-[#5dfd8a]/60 px-2 py-1 rounded transition-colors cursor-pointer"
                                title="Restock item"
                              >
                                + Restock (10)
                              </button>
                            )}

                            {/* Stepper */}
                            <div className="flex items-center border border-[#e4beb4] rounded-lg bg-white overflow-hidden shadow-2xs">
                              <button
                                onClick={() => handleStockChange(product.id, size.label, estimatedQty - 1)}
                                disabled={isPending || estimatedQty <= 0}
                                className="px-2.5 py-1 text-xs font-bold text-[#5b4039] hover:bg-[#f0edec] disabled:opacity-30 cursor-pointer"
                              >
                                -
                              </button>
                              <span className="px-3 py-1 font-mono font-bold text-xs text-[#1c1b1b] min-w-[32px] text-center">
                                {isPending ? '...' : estimatedQty}
                              </span>
                              <button
                                onClick={() => handleStockChange(product.id, size.label, estimatedQty + 1)}
                                disabled={isPending}
                                className="px-2.5 py-1 text-xs font-bold text-[#5b4039] hover:bg-[#f0edec] cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

