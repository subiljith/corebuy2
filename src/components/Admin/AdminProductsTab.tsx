import React, { useState } from 'react';
import { Product, CategoryItem, ProductSize } from '../../types';

interface AdminProductsTabProps {
  products: Product[];
  categories: CategoryItem[];
  onSaveProduct: (product: Partial<Product>, sizes: ProductSize[]) => Promise<void>;
  onDeleteProduct: (productId: string) => Promise<void>;
  isSaving: boolean;
}

export const AdminProductsTab: React.FC<AdminProductsTabProps> = ({
  products,
  categories,
  onSaveProduct,
  onDeleteProduct,
  isSaving,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: 'apparel',
    categoryLabel: 'Apparel',
    price: 999,
    originalPrice: 1499,
    discountPercent: 33,
    badge: 'Trending',
    badgeType: 'discount',
    image: '',
    description: '',
    color: 'Standard Edition',
    isTrending: true,
  });

  const [sizesList, setSizesList] = useState<ProductSize[]>([
    { label: 'S', available: true },
    { label: 'M', available: true },
    { label: 'L', available: true },
    { label: 'XL', available: true },
  ]);

  const [newSizeInput, setNewSizeInput] = useState('');

  // Open modal to add product
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      id: '',
      name: '',
      category: categories[0]?.id || 'apparel',
      categoryLabel: categories[0]?.label || 'Apparel',
      price: 999,
      originalPrice: 1499,
      discountPercent: 33,
      badge: 'New Arrival',
      badgeType: 'new',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZHPcBLg82LJOsZP62wF2zZ6dYzUU54qtRgqB8IsBY6vj9OL1r6ZIzn30R1khuv997HVs3CnxbZT5MU4sXSs6JPCGz_J8s3u9tGU-SCY99cbpg21gz7DMmIGuKWEcHi6JnZ-TR1SxCyzGRTAIQoDo08Fi-zoDplDq4Ga0y_soXWvFBNqcdjVQPo8J5gd-7l52ZrBKZkhaNPJfd4QoDiEZwsTSjZ90glw-xi1yNYaxEBgF2Wv_-6Kg',
      description: 'Engineered for high-intensity athletic performance and maximum breathability.',
      color: 'Pro Edition',
      isTrending: true,
    });
    setSizesList([
      { label: 'S', available: true },
      { label: 'M', available: true },
      { label: 'L', available: true },
      { label: 'XL', available: true },
    ]);
    setIsModalOpen(true);
  };

  // Open modal to edit existing product
  const handleOpenEdit = (prod: Product) => {
    setEditingProduct(prod);
    setFormData({
      id: prod.id,
      name: prod.name,
      category: prod.category || 'apparel',
      categoryLabel: prod.categoryLabel || 'Apparel',
      price: prod.price,
      originalPrice: prod.originalPrice || Math.round(prod.price * 1.3),
      discountPercent: prod.discountPercent || 20,
      badge: prod.badge || '',
      badgeType: prod.badgeType || 'discount',
      image: prod.image || prod.image_urls?.[0] || '',
      description: prod.description || '',
      color: prod.color || 'Standard',
      isTrending: prod.isTrending ?? true,
    });
    setSizesList(prod.sizes && prod.sizes.length > 0 ? [...prod.sizes] : [
      { label: 'S', available: true },
      { label: 'M', available: true },
      { label: 'L', available: true },
      { label: 'XL', available: true },
    ]);
    setIsModalOpen(true);
  };

  const handleToggleSize = (index: number) => {
    setSizesList((prev) =>
      prev.map((s, idx) => (idx === index ? { ...s, available: !s.available } : s))
    );
  };

  const handleAddCustomSize = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSizeInput.trim()) return;
    const clean = newSizeInput.trim();
    if (!sizesList.some((s) => s.label.toLowerCase() === clean.toLowerCase())) {
      setSizesList((prev) => [...prev, { label: clean, available: true }]);
    }
    setNewSizeInput('');
  };

  const handleRemoveSize = (label: string) => {
    setSizesList((prev) => prev.filter((s) => s.label !== label));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const matchedCategory = categories.find((c) => c.id === formData.category || c.slug === formData.category);
    
    await onSaveProduct(
      {
        ...formData,
        id: formData.id || `prod-${Date.now()}`,
        categoryLabel: matchedCategory?.label || formData.categoryLabel,
      },
      sizesList
    );
    setIsModalOpen(false);
  };

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchSearch =
      !search.trim() ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.categoryLabel || '').toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-[#e4beb4]/40 shadow-2xs">
        <div className="flex-1 flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#5b4039] text-lg pointer-events-none">
              search
            </span>
            <input
              type="text"
              placeholder="Search products by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#f6f3f2] border border-[#e4beb4] rounded-xl text-xs text-[#1c1b1b] placeholder:text-[#5b4039]/60 focus:outline-none focus:border-[#b02f00]"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs font-semibold bg-[#f6f3f2] border border-[#e4beb4] rounded-xl px-3 py-2 text-[#1c1b1b] focus:outline-none focus:border-[#b02f00] cursor-pointer"
          >
            <option value="all">All Categories ({products.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* Add Product CTA */}
        <button
          onClick={handleOpenAdd}
          className="bg-[#b02f00] hover:bg-[#862200] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all active:scale-95 flex items-center gap-2 cursor-pointer shrink-0"
        >
          <span className="material-symbols-outlined text-base">add</span>
          Add New Product
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-[#e4beb4]/40 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#fcf9f8] border-b border-[#ebe7e7] text-[11px] uppercase tracking-wider font-bold text-[#5b4039]">
                <th className="py-3.5 px-4">Item Details</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price (₹)</th>
                <th className="py-3.5 px-4">Sizes & Stock</th>
                <th className="py-3.5 px-4">Badge</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ebe7e7] text-xs">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-[#5b4039]">
                    <span className="material-symbols-outlined text-4xl mb-2 opacity-50">search_off</span>
                    <p>No products match your search or filter.</p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const img = p.image || p.image_urls?.[0] || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZHPcBLg82LJOsZP62wF2zZ6dYzUU54qtRgqB8IsBY6vj9OL1r6ZIzn30R1khuv997HVs3CnxbZT5MU4sXSs6JPCGz_J8s3u9tGU-SCY99cbpg21gz7DMmIGuKWEcHi6JnZ-TR1SxCyzGRTAIQoDo08Fi-zoDplDq4Ga0y_soXWvFBNqcdjVQPo8J5gd-7l52ZrBKZkhaNPJfd4QoDiEZwsTSjZ90glw-xi1yNYaxEBgF2Wv_-6Kg';
                  return (
                    <tr key={p.id} className="hover:bg-[#fcf9f8]/60 transition-colors">
                      {/* Item Details */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={img}
                            alt={p.name}
                            className="w-12 h-12 rounded-lg object-contain bg-[#F1F3F5] p-1 border border-[#ebe7e7] shrink-0 mix-blend-multiply"
                          />
                          <div className="min-w-0 max-w-xs">
                            <p className="font-bold text-[#1c1b1b] truncate">{p.name}</p>
                            <p className="text-[11px] text-[#5b4039] truncate">
                              ID: <span className="font-mono">{p.id}</span>
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4">
                        <span className="bg-[#f0edec] text-[#5b4039] text-[11px] font-semibold px-2.5 py-1 rounded-full">
                          {p.categoryLabel || p.category || 'General'}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-4">
                        <div className="font-display font-bold text-sm text-[#1c1b1b]">
                          ₹{p.price.toLocaleString('en-IN')}
                        </div>
                        {p.originalPrice && (
                          <span className="text-[11px] text-[#5b4039] line-through">
                            ₹{p.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </td>

                      {/* Sizes */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {(p.sizes || []).map((s) => (
                            <span
                              key={s.label}
                              className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                s.available
                                  ? 'bg-[#5dfd8a]/40 text-[#007232]'
                                  : 'bg-[#e5e2e1] text-[#5b4039] line-through'
                              }`}
                            >
                              {s.label}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Badge */}
                      <td className="py-3.5 px-4">
                        {p.badge ? (
                          <span className="bg-[#ba1a1a] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                            {p.badge}
                          </span>
                        ) : (
                          <span className="text-[#5b4039]/50 text-[11px]">-</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="p-1.5 bg-[#f0edec] hover:bg-[#ffdbd1]/60 text-[#b02f00] rounded-lg transition-colors cursor-pointer"
                            title="Edit Product"
                          >
                            <span className="material-symbols-outlined text-base">edit</span>
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to delete "${p.name}"?`)) {
                                onDeleteProduct(p.id);
                              }
                            }}
                            className="p-1.5 bg-[#f0edec] hover:bg-[#ba1a1a]/10 text-[#ba1a1a] rounded-lg transition-colors cursor-pointer"
                            title="Delete Product"
                          >
                            <span className="material-symbols-outlined text-base">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#e4beb4]/50 max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-[#ebe7e7] flex items-center justify-between bg-[#fcf9f8]">
              <div>
                <h3 className="font-display font-bold text-lg text-[#1c1b1b]">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
                <p className="text-xs text-[#5b4039]">
                  Changes will immediately sync to both database and live store.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-[#5b4039] hover:bg-[#ebe7e7] rounded-full cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Product Name */}
                <div className="md:col-span-2 space-y-1">
                  <label className="font-bold text-[#1c1b1b]">Product Title / Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. CoreBuy Velocity Speed Shoes"
                    className="w-full p-2.5 bg-[#f6f3f2] border border-[#e4beb4] rounded-xl text-xs focus:outline-none focus:border-[#b02f00]"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1">
                  <label className="font-bold text-[#1c1b1b]">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 bg-[#f6f3f2] border border-[#e4beb4] rounded-xl text-xs focus:outline-none focus:border-[#b02f00]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Badge */}
                <div className="space-y-1">
                  <label className="font-bold text-[#1c1b1b]">Promo Badge (Optional)</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. 50% OFF, Bestseller, New"
                    className="w-full p-2.5 bg-[#f6f3f2] border border-[#e4beb4] rounded-xl text-xs focus:outline-none focus:border-[#b02f00]"
                  />
                </div>

                {/* Selling Price */}
                <div className="space-y-1">
                  <label className="font-bold text-[#1c1b1b]">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full p-2.5 bg-[#f6f3f2] border border-[#e4beb4] rounded-xl text-xs focus:outline-none focus:border-[#b02f00]"
                  />
                </div>

                {/* Original MRP */}
                <div className="space-y-1">
                  <label className="font-bold text-[#1c1b1b]">Original MRP (₹)</label>
                  <input
                    type="number"
                    min={1}
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full p-2.5 bg-[#f6f3f2] border border-[#e4beb4] rounded-xl text-xs focus:outline-none focus:border-[#b02f00]"
                  />
                </div>

                {/* Image URL */}
                <div className="md:col-span-2 space-y-1">
                  <label className="font-bold text-[#1c1b1b]">Image URL *</label>
                  <input
                    type="url"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://..."
                    className="w-full p-2.5 bg-[#f6f3f2] border border-[#e4beb4] rounded-xl text-xs focus:outline-none focus:border-[#b02f00]"
                  />
                  {formData.image && (
                    <div className="mt-2 flex items-center gap-3 p-2 bg-[#f0edec] rounded-lg">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-12 h-12 object-contain bg-white rounded-md p-1"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <span className="text-[11px] text-[#5b4039]">Live image preview</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="md:col-span-2 space-y-1">
                  <label className="font-bold text-[#1c1b1b]">Product Description</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter key benefits, fabric details, and athletic features..."
                    className="w-full p-2.5 bg-[#f6f3f2] border border-[#e4beb4] rounded-xl text-xs focus:outline-none focus:border-[#b02f00]"
                  />
                </div>

                {/* Sizes Management */}
                <div className="md:col-span-2 space-y-2 border-t border-[#ebe7e7] pt-3">
                  <label className="font-bold text-[#1c1b1b]">Available Sizes (Click to toggle in stock)</label>
                  <div className="flex flex-wrap gap-2">
                    {sizesList.map((s, idx) => (
                      <div
                        key={s.label}
                        onClick={() => handleToggleSize(idx)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer select-none transition-all ${
                          s.available
                            ? 'bg-[#007232] text-white border-[#007232]'
                            : 'bg-[#f0edec] text-[#5b4039] border-[#e4beb4] line-through'
                        }`}
                      >
                        <span>{s.label}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveSize(s.label);
                          }}
                          className="hover:text-red-300 ml-1 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add Custom Size */}
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="text"
                      placeholder="Add custom size (e.g. XXL or UK 9)"
                      value={newSizeInput}
                      onChange={(e) => setNewSizeInput(e.target.value)}
                      className="p-2 bg-[#f6f3f2] border border-[#e4beb4] rounded-lg text-xs flex-1 max-w-xs focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddCustomSize}
                      className="px-3 py-2 bg-[#f0edec] hover:bg-[#ffdbd1] text-[#b02f00] font-bold rounded-lg cursor-pointer"
                    >
                      + Add Size
                    </button>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-[#ebe7e7] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-[#5b4039] hover:bg-[#f0edec] rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-[#b02f00] hover:bg-[#862200] text-white font-bold text-xs rounded-xl shadow-xs transition-all active:scale-95 disabled:opacity-50 cursor-pointer flex items-center gap-2"
                >
                  {isSaving && <span className="material-symbols-outlined text-sm animate-spin">sync</span>}
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

