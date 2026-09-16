import React, { useState, useRef } from 'react';
import { CategoryItem, Product } from '../../types';

interface AdminCategoriesTabProps {
  categories: CategoryItem[];
  products: Product[];
  onSaveCategory: (category: Partial<CategoryItem>) => Promise<void>;
  onDeleteCategory: (categoryId: string) => Promise<void>;
  isSaving: boolean;
}

export const AdminCategoriesTab: React.FC<AdminCategoriesTabProps> = ({
  categories,
  products,
  onSaveCategory,
  onDeleteCategory,
  isSaving,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<CategoryItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    slug: '',
    image: '',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenAdd = () => {
    setEditingCat(null);
    setFormData({
      id: '',
      name: '',
      slug: '',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1-woXXKDxPaizeinHfBxTUCxRcmqz5_QvhXhZn5DO1u3iNXfRIgEONPSW5OtlwgWok1c4oF7s9qtyWDel4ze-kU9JnQ9eot7HM7KskiygETvcB6_LDKW3WuXiAEUqkQxKahIVLCt4vEg8Kkye4753HQEHerxxYWehMBgCyMUKrOe3PFkxk7ycZVessJzmKxGRa_DIlJIqD-Pw5cLNGEOYAVYwQ8bVWe10HIaHdZqR8eals0_hzmg',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: CategoryItem) => {
    setEditingCat(cat);
    setFormData({
      id: String(cat.id),
      name: cat.label || cat.name || '',
      slug: cat.slug || String(cat.id),
      image: cat.image || '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanSlug = (formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-')).toLowerCase();
    await onSaveCategory({
      id: formData.id || cleanSlug,
      label: formData.name,
      name: formData.name,
      slug: cleanSlug,
      image: formData.image,
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-[#e4beb4]/40 shadow-2xs">
        <div>
          <h2 className="font-display font-bold text-lg text-[#1c1b1b]">Store Categories</h2>
          <p className="text-xs text-[#5b4039]">
            Organize gear into collections across the store header and catalog.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-[#b02f00] hover:bg-[#862200] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all active:scale-95 flex items-center gap-2 cursor-pointer shrink-0"
        >
          <span className="material-symbols-outlined text-base">add</span>
          Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {categories.map((cat) => {
          const count = products.filter(
            (p) => p.category === cat.id || p.category === cat.slug || p.category_id === cat.id
          ).length;

          return (
            <div
              key={cat.id}
              className="bg-white rounded-2xl p-5 border border-[#e4beb4]/40 shadow-2xs flex flex-col justify-between space-y-4 hover:border-[#b02f00]/40 transition-all"
            >
              <div className="flex items-center gap-3.5">
                <img
                  src={cat.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1-woXXKDxPaizeinHfBxTUCxRcmqz5_QvhXhZn5DO1u3iNXfRIgEONPSW5OtlwgWok1c4oF7s9qtyWDel4ze-kU9JnQ9eot7HM7KskiygETvcB6_LDKW3WuXiAEUqkQxKahIVLCt4vEg8Kkye4753HQEHerxxYWehMBgCyMUKrOe3PFkxk7ycZVessJzmKxGRa_DIlJIqD-Pw5cLNGEOYAVYwQ8bVWe10HIaHdZqR8eals0_hzmg'}
                  alt={cat.label}
                  className="w-14 h-14 rounded-full object-contain bg-[#f0edec] p-2 border border-[#ebe7e7] shrink-0 mix-blend-multiply"
                />
                <div className="min-w-0">
                  <h3 className="font-bold text-base text-[#1c1b1b]">{cat.label}</h3>
                  <p className="text-xs text-[#5b4039]">{count} live products</p>
                  <span className="font-mono text-[10px] text-[#5b4039]/70 mt-0.5 block">
                    slug: {cat.slug || cat.id}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#ebe7e7]">
                <button
                  onClick={() => handleOpenEdit(cat)}
                  className="px-3 py-1.5 bg-[#f0edec] hover:bg-[#ffdbd1] text-[#b02f00] text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete category "${cat.label}"?`)) {
                      onDeleteCategory(String(cat.id));
                    }
                  }}
                  className="px-3 py-1.5 bg-[#f0edec] hover:bg-[#ba1a1a]/10 text-[#ba1a1a] text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-[#e4beb4]/50 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-[#ebe7e7] flex items-center justify-between bg-[#fcf9f8]">
              <h3 className="font-display font-bold text-base text-[#1c1b1b]">
                {editingCat ? 'Edit Category' : 'Create New Category'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-[#5b4039] hover:bg-[#ebe7e7] rounded-full cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#1c1b1b]">Category Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cricket Gear, Gym Accessories"
                  value={formData.name}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFormData({
                      ...formData,
                      name: val,
                      slug: !formData.id ? val.toLowerCase().replace(/\s+/g, '-') : formData.slug,
                    });
                  }}
                  className="w-full p-2.5 bg-[#f6f3f2] border border-[#e4beb4] rounded-xl focus:outline-none focus:border-[#b02f00]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#1c1b1b]">URL Slug *</label>
                <input
                  type="text"
                  required
                  placeholder="cricket-gear"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full p-2.5 bg-[#f6f3f2] border border-[#e4beb4] rounded-xl focus:outline-none focus:border-[#b02f00]"
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold text-[#1c1b1b]">Category Image / Icon</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-2 bg-[#f0edec] hover:bg-[#ffdbd1] text-[#b02f00] text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">upload_file</span>
                    Choose from Gallery
                  </button>
                  <span className="text-[11px] text-[#5b4039]">or paste URL below:</span>
                </div>
                <input
                  type="text"
                  placeholder="https://... or uploaded image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full p-2.5 bg-[#f6f3f2] border border-[#e4beb4] rounded-xl focus:outline-none focus:border-[#b02f00]"
                />
                {formData.image && (
                  <div className="flex items-center gap-2 p-2 bg-[#f0edec] rounded-lg">
                    <img src={formData.image} alt="Preview" className="w-10 h-10 object-contain rounded-md bg-white p-1" />
                    <span className="text-[11px] text-[#006d2f] font-semibold">Image selected</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-[#ebe7e7] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#5b4039] hover:bg-[#f0edec] rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-[#b02f00] hover:bg-[#862200] text-white font-bold text-xs rounded-xl shadow-xs transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {editingCat ? 'Save Category' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

