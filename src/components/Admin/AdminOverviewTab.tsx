import React from 'react';
import { Product, Order, CategoryItem, AdminTab } from '../../types';

interface AdminOverviewTabProps {
  products: Product[];
  orders: Order[];
  categories: CategoryItem[];
  onSelectTab: (tab: AdminTab) => void;
  onOpenAddProduct: () => void;
  onUpdateOrderStatus: (orderId: string, status: string) => void;
}

export const AdminOverviewTab: React.FC<AdminOverviewTabProps> = ({
  products,
  orders,
  categories,
  onSelectTab,
  onOpenAddProduct,
  onUpdateOrderStatus,
}) => {
  // Compute analytics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const deliveredOrders = orders.filter((o) => o.status === 'Delivered').length;
  const activeOrders = orders.filter((o) => o.status !== 'Delivered');

  // Low stock calculation across all product sizes
  const lowStockItems: { product: Product; size: string; count: number }[] = [];
  products.forEach((p) => {
    (p.sizes || []).forEach((s) => {
      // If note is "Few Left" or stock is 0 or available is false
      if (!s.available || s.note === 'Few Left') {
        lowStockItems.push({
          product: p,
          size: s.label,
          count: !s.available ? 0 : 2,
        });
      }
    });
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#1c1b1b] via-[#2d2220] to-[#b02f00] rounded-2xl p-6 md:p-8 text-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="inline-block bg-white/20 text-[#ffdbd1] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            Store Owner Control Center
          </span>
          <h1 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight">
            Welcome to Your Admin Portal
          </h1>
          <p className="text-xs md:text-sm text-white/80 mt-1 max-w-xl">
            Effortlessly add products, monitor stock quantities, and manage customer shipments without dealing with complex database queries.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAddProduct}
            className="bg-[#b02f00] hover:bg-[#862200] text-white font-bold text-xs md:text-sm px-5 py-3 rounded-xl shadow-sm transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">add_circle</span>
            Add New Product
          </button>
          <button
            onClick={() => onSelectTab('stock')}
            className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs md:text-sm px-4 py-3 rounded-xl border border-white/20 transition-all cursor-pointer"
          >
            Check Inventory
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Total Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-[#e4beb4]/40 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-[#5b4039] tracking-wider">Total Sales</span>
            <div className="w-10 h-10 rounded-xl bg-[#5dfd8a]/30 text-[#007232] flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">payments</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="font-display font-black text-2xl md:text-3xl text-[#1c1b1b]">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </span>
            <p className="text-[11px] text-[#006d2f] font-semibold mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              {orders.length} orders recorded
            </p>
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white p-5 rounded-2xl border border-[#e4beb4]/40 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-[#5b4039] tracking-wider">Products</span>
            <div className="w-10 h-10 rounded-xl bg-[#ffdbd1]/50 text-[#b02f00] flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">inventory_2</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="font-display font-black text-2xl md:text-3xl text-[#1c1b1b]">
              {products.length}
            </span>
            <p className="text-[11px] text-[#5b4039] mt-1">
              Across {categories.length} categories
            </p>
          </div>
        </div>

        {/* Active Orders */}
        <div className="bg-white p-5 rounded-2xl border border-[#e4beb4]/40 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-[#5b4039] tracking-wider">Pending Orders</span>
            <div className="w-10 h-10 rounded-xl bg-[#ff9800]/20 text-[#e65100] flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">local_shipping</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="font-display font-black text-2xl md:text-3xl text-[#1c1b1b]">
              {activeOrders.length}
            </span>
            <p className="text-[11px] text-[#e65100] font-semibold mt-1">
              {deliveredOrders} delivered so far
            </p>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white p-5 rounded-2xl border border-[#e4beb4]/40 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-[#5b4039] tracking-wider">Stock Alerts</span>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${lowStockItems.length > 0 ? 'bg-[#ba1a1a]/20 text-[#ba1a1a]' : 'bg-[#5dfd8a]/20 text-[#006d2f]'}`}>
              <span className="material-symbols-outlined text-xl">warning</span>
            </div>
          </div>
          <div className="mt-4">
            <span className={`font-display font-black text-2xl md:text-3xl ${lowStockItems.length > 0 ? 'text-[#ba1a1a]' : 'text-[#006d2f]'}`}>
              {lowStockItems.length}
            </span>
            <p className="text-[11px] text-[#5b4039] mt-1">
              {lowStockItems.length > 0 ? 'Sizes requiring restock' : 'All sizes healthy'}
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Recent Orders & Stock Alert highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Orders Overview */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#e4beb4]/40 p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-display font-bold text-lg text-[#1c1b1b]">Recent Customer Orders</h2>
              <p className="text-xs text-[#5b4039]">Live orders placed on CoreBuy</p>
            </div>
            <button
              onClick={() => onSelectTab('orders')}
              className="text-xs font-bold text-[#b02f00] hover:underline flex items-center gap-1 cursor-pointer"
            >
              All Orders ({orders.length}) →
            </button>
          </div>

          {orders.length === 0 ? (
            <div className="py-12 text-center text-[#5b4039]">
              <span className="material-symbols-outlined text-4xl mb-2 opacity-50">shopping_bag</span>
              <p className="text-xs">No orders recorded yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-[#ebe7e7] overflow-x-auto">
              {orders.slice(0, 5).map((order) => (
                <div key={order.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-[#1c1b1b]">{order.id}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        order.status === 'Delivered'
                          ? 'bg-[#5dfd8a]/40 text-[#006d2f]'
                          : order.status === 'In Transit'
                          ? 'bg-[#ff9800]/20 text-[#e65100]'
                          : 'bg-[#ffdbd1] text-[#b02f00]'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#5b4039] mt-0.5 truncate">
                      {order.formData?.fullName || 'Customer'} • {order.items?.length || 1} items • {order.formData?.paymentMethod === 'cod' ? 'COD' : 'Prepaid'}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-display font-bold text-sm text-[#1c1b1b]">
                      ₹{(order.total || 0).toLocaleString('en-IN')}
                    </span>
                    <select
                      value={order.status}
                      onChange={(e) => onUpdateOrderStatus(order.id, e.target.value)}
                      className="text-[11px] font-semibold bg-[#f6f3f2] border border-[#e4beb4] rounded-lg px-2 py-1 text-[#1c1b1b] cursor-pointer"
                    >
                      <option value="Order Confirmed">Confirmed</option>
                      <option value="Packed">Packed</option>
                      <option value="In Transit">In Transit</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Low Stock Watchlist */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-[#e4beb4]/40 p-6 shadow-2xs flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display font-bold text-lg text-[#1c1b1b]">Stock Watchlist</h2>
              <p className="text-xs text-[#5b4039]">Sizes needing attention</p>
            </div>
            <button
              onClick={() => onSelectTab('stock')}
              className="text-xs font-bold text-[#b02f00] hover:underline cursor-pointer"
            >
              Manage →
            </button>
          </div>

          {lowStockItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-8 text-center">
              <span className="material-symbols-outlined text-4xl text-[#006d2f] mb-2">check_circle</span>
              <p className="text-xs font-bold text-[#1c1b1b]">Inventory Healthy</p>
              <p className="text-[11px] text-[#5b4039] mt-0.5">All products currently have ample stock.</p>
            </div>
          ) : (
            <div className="space-y-3 flex-1 overflow-y-auto max-h-[320px]">
              {lowStockItems.slice(0, 6).map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => onSelectTab('stock')}
                  className="p-2.5 rounded-xl bg-[#fcf9f8] border border-[#e4beb4]/30 flex items-center justify-between gap-3 hover:border-[#b02f00] transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={item.product.image || item.product.image_urls?.[0]}
                      alt={item.product.name}
                      className="w-10 h-10 rounded-lg object-contain bg-white p-1 border border-[#ebe7e7]"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#1c1b1b] truncate">{item.product.name}</p>
                      <p className="text-[11px] text-[#5b4039]">Size: <strong className="text-[#1c1b1b]">{item.size}</strong></p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    item.count === 0 ? 'bg-[#ba1a1a] text-white' : 'bg-[#ff9800]/20 text-[#e65100]'
                  }`}>
                    {item.count === 0 ? 'Out of Stock' : 'Low Stock'}
                  </span>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => onSelectTab('stock')}
            className="w-full mt-4 bg-[#f0edec] hover:bg-[#ffdbd1]/50 text-[#b02f00] text-xs font-bold py-2.5 rounded-xl transition-all text-center cursor-pointer"
          >
            Open Full Stock Manager
          </button>
        </div>
      </div>
    </div>
  );
};

