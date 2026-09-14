import React from 'react';
import { Order } from '../types';

interface AccountScreenProps {
  orders: Order[];
  onBackToShop: () => void;
  onSelectOrder?: (order: Order) => void;
  onRefreshOrders?: () => void;
  isLoading?: boolean;
}

export const AccountScreen: React.FC<AccountScreenProps> = ({ orders, onBackToShop, onRefreshOrders, isLoading }) => {
  return (
    <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-16 py-6 md:py-10 space-y-8 pb-24 md:pb-16">
      {/* Athlete Profile Header */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#e4beb4]/40 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#b02f00] text-white flex items-center justify-center font-display font-black text-2xl shadow-sm">
            VK
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-bold text-xl md:text-2xl text-[#1c1b1b]">
                Virat Kohli
              </h1>
              <span className="bg-[#ffdbd1] text-[#b02f00] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Pro Athlete
              </span>
            </div>
            <p className="text-xs text-[#5b4039] mt-0.5">
              +91 98765 43210 • Bengaluru, Karnataka
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="bg-[#f0edec] p-3 rounded-xl flex-1 md:flex-none text-center">
            <span className="text-[10px] uppercase font-bold text-[#5b4039] block">Total Orders</span>
            <span className="font-display font-bold text-lg text-[#1c1b1b]">{orders.length}</span>
          </div>
          <div className="bg-[#5dfd8a]/20 p-3 rounded-xl flex-1 md:flex-none text-center">
            <span className="text-[10px] uppercase font-bold text-[#006d2f] block">CoreBuy Points</span>
            <span className="font-display font-bold text-lg text-[#006d2f]">1,250 PTS</span>
          </div>
          {onRefreshOrders && (
            <button
              onClick={onRefreshOrders}
              disabled={isLoading}
              className="p-3 bg-[#f0edec] hover:bg-[#ffdbd1]/50 text-[#b02f00] rounded-xl flex items-center justify-center cursor-pointer transition-colors"
              title="Sync with Supabase"
            >
              <span className={`material-symbols-outlined text-xl ${isLoading ? 'animate-spin' : ''}`}>
                sync
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Orders List & Delhivery Tracker */}
      <div className="space-y-4">
        <h2 className="font-display font-bold text-xl text-[#1c1b1b] flex items-center justify-between">
          <span>Order History &amp; Live Tracking</span>
          <span className="text-xs font-normal text-[#5b4039]">{orders.length} shipments</span>
        </h2>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-[#e4beb4]/40">
            <span className="material-symbols-outlined text-5xl text-[#5b4039]/40 mb-2">
              package_2
            </span>
            <h3 className="font-bold text-base text-[#1c1b1b]">No orders yet</h3>
            <p className="text-xs text-[#5b4039] mt-1 mb-4">
              When you place an order, live shipping status and invoice will appear here.
            </p>
            <button
              onClick={onBackToShop}
              className="bg-[#b02f00] text-white text-xs font-bold px-6 py-2.5 rounded-lg"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl p-6 border border-[#e4beb4]/50 shadow-xs space-y-5"
              >
                {/* Header bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#ebe7e7]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-base text-[#1c1b1b]">
                        {order.id}
                      </span>
                      <span className="bg-[#5dfd8a]/40 text-[#007232] text-xs font-bold px-2.5 py-0.5 rounded-full">
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#5b4039] mt-0.5">
                      Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} • {order.formData?.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Prepaid (Razorpay / UPI)'}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-[#5b4039] block">Total Amount</span>
                    <span className="font-display font-bold text-lg text-[#b02f00]">
                      ₹{order.total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Delhivery Shipment Tracker Stage */}
                <div className="bg-[#fcf9f8] p-4 rounded-xl border border-[#e4beb4]/30">
                  <div className="flex items-center justify-between text-xs mb-3">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#006d2f] text-base">
                        local_shipping
                      </span>
                      <span className="font-bold text-[#1c1b1b]">Carrier: {order.carrier || 'Delhivery Express'}</span>
                    </div>
                    <span className="font-mono font-semibold text-[#5b4039]">
                      AWB: {order.trackingNumber || 'DEL-PENDING'}
                    </span>
                  </div>

                  {/* 4-Step Tracker */}
                  <div className="grid grid-cols-4 gap-2 text-center relative mt-2">
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 rounded-full bg-[#006d2f] text-white flex items-center justify-center text-xs mb-1">
                        ✓
                      </div>
                      <span className="text-[10px] font-bold text-[#1c1b1b]">Placed</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 rounded-full bg-[#006d2f] text-white flex items-center justify-center text-xs mb-1">
                        ✓
                      </div>
                      <span className="text-[10px] font-bold text-[#1c1b1b]">Packed</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 rounded-full bg-[#ff5722] text-white flex items-center justify-center text-xs mb-1 animate-pulse">
                        ●
                      </div>
                      <span className="text-[10px] font-bold text-[#b02f00]">In Transit</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 rounded-full bg-[#e5e2e1] text-[#5b4039] flex items-center justify-center text-xs mb-1">
                        ○
                      </div>
                      <span className="text-[10px] text-[#5b4039]">Delivered</span>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {(order.items || []).map((item, idx) => {
                    const itemImg = item.product?.image || item.product?.image_urls?.[0] || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZHPcBLg82LJOsZP62wF2zZ6dYzUU54qtRgqB8IsBY6vj9OL1r6ZIzn30R1khuv997HVs3CnxbZT5MU4sXSs6JPCGz_J8s3u9tGU-SCY99cbpg21gz7DMmIGuKWEcHi6JnZ-TR1SxCyzGRTAIQoDo08Fi-zoDplDq4Ga0y_soXWvFBNqcdjVQPo8J5gd-7l52ZrBKZkhaNPJfd4QoDiEZwsTSjZ90glw-xi1yNYaxEBgF2Wv_-6Kg';
                    const itemPrice = item.product?.price ?? item.product?.sale_price ?? 0;
                    return (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#F1F3F5] rounded-lg p-1 shrink-0 flex items-center justify-center border border-[#ebe7e7]">
                          <img src={itemImg} alt={item.product?.name || 'Product'} className="w-full h-full object-contain mix-blend-multiply" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-[#1c1b1b] truncate">{item.product?.name || 'Product'}</p>
                          <p className="text-[11px] text-[#5b4039]">
                            Size: {item.selectedSize} • Qty: {item.quantity}
                          </p>
                        </div>
                        <div className="font-bold text-xs text-[#1c1b1b]">
                          ₹{(itemPrice * item.quantity).toLocaleString('en-IN')}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Delivery Address Snapshot */}
                <div className="text-xs text-[#5b4039] bg-[#f0edec] p-3 rounded-lg flex justify-between items-center">
                  <span>
                    <strong>Ship To:</strong> {order.formData?.fullName || 'Customer'}, {order.formData?.houseNo || ''} {order.formData?.street || ''}, {order.formData?.city || ''}, {order.formData?.state || ''} - {order.formData?.pincode || ''}
                  </span>
                  <a
                    href={`https://wa.me/919876543210?text=Hi%20CoreBuy%2C%20status%20for%20order%20${order.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#006d2f] font-bold hover:underline shrink-0 ml-4 flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">chat</span>
                    Ask on WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};
