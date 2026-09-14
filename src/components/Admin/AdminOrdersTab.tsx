import React, { useState } from 'react';
import { Order } from '../../types';

interface AdminOrdersTabProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: string) => Promise<void>;
  isUpdating: boolean;
}

export const AdminOrdersTab: React.FC<AdminOrdersTabProps> = ({
  orders,
  onUpdateOrderStatus,
  isUpdating,
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const filteredOrders = orders.filter((o) => {
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      o.id.toLowerCase().includes(q) ||
      (o.formData?.fullName || '').toLowerCase().includes(q) ||
      (o.formData?.phoneNumber || '').includes(q) ||
      (o.formData?.city || '').toLowerCase().includes(q);

    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-[#e4beb4]/40 shadow-2xs">
        <div>
          <h2 className="font-display font-bold text-lg text-[#1c1b1b]">Customer Orders &amp; Shipments</h2>
          <p className="text-xs text-[#5b4039]">
            Track delivery stages and communicate with customers via WhatsApp.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#5b4039] text-lg pointer-events-none">
              search
            </span>
            <input
              type="text"
              placeholder="Search by customer, phone, ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#f6f3f2] border border-[#e4beb4] rounded-xl text-xs text-[#1c1b1b] focus:outline-none focus:border-[#b02f00]"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs font-semibold bg-[#f6f3f2] border border-[#e4beb4] rounded-xl px-3 py-2 text-[#1c1b1b] focus:outline-none focus:border-[#b02f00] cursor-pointer"
          >
            <option value="all">All Orders ({orders.length})</option>
            <option value="Order Confirmed">Confirmed</option>
            <option value="Packed">Packed</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#e4beb4]/40 text-[#5b4039]">
            <span className="material-symbols-outlined text-4xl mb-2 opacity-50">receipt_long</span>
            <p className="text-xs font-bold text-[#1c1b1b]">No Orders Found</p>
            <p className="text-xs mt-1">Try adjusting your search query or filter.</p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const isExpanded = expandedOrderId === order.id;
            const items = order.items || [];
            const cleanPhone = (order.formData?.phoneNumber || '').replace(/\D/g, '');

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-[#e4beb4]/40 shadow-2xs overflow-hidden transition-all"
              >
                {/* Order Summary Line */}
                <div
                  onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                  className="p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-[#fcf9f8]/60 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#f0edec] text-[#b02f00] flex items-center justify-center font-bold text-xs shrink-0">
                      <span className="material-symbols-outlined">local_shipping</span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs md:text-sm text-[#1c1b1b]">
                          {order.id}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                            order.status === 'Delivered'
                              ? 'bg-[#5dfd8a]/40 text-[#007232]'
                              : order.status === 'In Transit'
                              ? 'bg-[#ff9800]/20 text-[#e65100]'
                              : 'bg-[#ffdbd1] text-[#b02f00]'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#5b4039] mt-0.5 truncate">
                        {order.formData?.fullName || 'Customer'} • +91 {order.formData?.phoneNumber || 'N/A'} • {order.formData?.city || ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#ebe7e7]">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] uppercase font-bold text-[#5b4039] block">Total</span>
                      <span className="font-display font-bold text-base text-[#b02f00]">
                        ₹{(order.total || 0).toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Status Changer Select */}
                    <div onClick={(e) => e.stopPropagation()}>
                      <select
                        value={order.status}
                        onChange={(e) => onUpdateOrderStatus(order.id, e.target.value)}
                        className="text-xs font-bold bg-[#f6f3f2] border border-[#e4beb4] rounded-xl px-3 py-2 text-[#1c1b1b] cursor-pointer focus:border-[#b02f00] focus:outline-none"
                      >
                        <option value="Order Confirmed">Confirmed</option>
                        <option value="Packed">Packed</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>

                    <span className="material-symbols-outlined text-[#5b4039] text-xl transition-transform">
                      {isExpanded ? 'expand_less' : 'expand_more'}
                    </span>
                  </div>
                </div>

                {/* Expanded Details Drawer */}
                {isExpanded && (
                  <div className="p-5 bg-[#fcf9f8] border-t border-[#ebe7e7] space-y-4 text-xs animate-in slide-in-from-top-2 duration-150">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Shipping Address */}
                      <div className="bg-white p-3.5 rounded-xl border border-[#e4beb4]/30">
                        <span className="font-bold text-[#1c1b1b] uppercase tracking-wider text-[10px] block mb-1.5 text-[#b02f00]">
                          Shipping Destination
                        </span>
                        <p className="font-semibold text-[#1c1b1b]">{order.formData?.fullName}</p>
                        <p className="text-[#5b4039] mt-0.5">
                          {order.formData?.houseNo}, {order.formData?.street}
                        </p>
                        <p className="text-[#5b4039]">
                          {order.formData?.city}, {order.formData?.state} - {order.formData?.pincode}
                        </p>
                        <p className="text-[#5b4039] mt-1">
                          Phone: <strong className="text-[#1c1b1b]">+91 {order.formData?.phoneNumber}</strong>
                        </p>
                      </div>

                      {/* Payment & Logistics Info */}
                      <div className="bg-white p-3.5 rounded-xl border border-[#e4beb4]/30 flex flex-col justify-between">
                        <div>
                          <span className="font-bold text-[#1c1b1b] uppercase tracking-wider text-[10px] block mb-1.5 text-[#b02f00]">
                            Shipment Logistics
                          </span>
                          <p className="text-[#5b4039]">
                            Carrier: <strong className="text-[#1c1b1b]">{order.carrier || 'Delhivery Express'}</strong>
                          </p>
                          <p className="text-[#5b4039]">
                            AWB / Tracking: <strong className="font-mono text-[#1c1b1b]">{order.trackingNumber || 'DEL-PENDING'}</strong>
                          </p>
                          <p className="text-[#5b4039]">
                            Payment Mode: <strong className="text-[#1c1b1b]">{order.formData?.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Prepaid Online'}</strong>
                          </p>
                        </div>

                        {cleanPhone && (
                          <a
                            href={`https://wa.me/91${cleanPhone}?text=${encodeURIComponent(`Hi ${order.formData?.fullName}, updating you regarding your CoreBuy order #${order.id}. Current status is: ${order.status}.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center gap-1.5 font-bold text-xs text-[#006d2f] hover:underline"
                          >
                            <span className="material-symbols-outlined text-sm">chat</span>
                            Message Customer on WhatsApp
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Ordered Items List */}
                    <div className="bg-white p-4 rounded-xl border border-[#e4beb4]/30 space-y-3">
                      <span className="font-bold text-[#1c1b1b] uppercase tracking-wider text-[10px] block text-[#5b4039]">
                        Purchased Items ({items.length})
                      </span>
                      <div className="divide-y divide-[#ebe7e7]">
                        {items.map((item, idx) => {
                          const img = item.product?.image || item.product?.image_urls?.[0];
                          const price = item.product?.price ?? item.product?.sale_price ?? 0;
                          return (
                            <div key={idx} className="py-2.5 flex items-center justify-between gap-3">
                              <div className="flex items-center gap-3 min-w-0">
                                {img && (
                                  <img
                                    src={img}
                                    alt={item.product?.name || 'Product'}
                                    className="w-10 h-10 object-contain bg-[#F1F3F5] rounded-lg p-1 border border-[#ebe7e7]"
                                  />
                                )}
                                <div className="min-w-0">
                                  <p className="font-bold text-[#1c1b1b] truncate">{item.product?.name || 'Product'}</p>
                                  <p className="text-[#5b4039] text-[11px]">
                                    Size: <strong>{item.selectedSize}</strong> • Quantity: <strong>{item.quantity}</strong>
                                  </p>
                                </div>
                              </div>
                              <span className="font-display font-bold text-xs text-[#1c1b1b]">
                                ₹{(price * item.quantity).toLocaleString('en-IN')}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

