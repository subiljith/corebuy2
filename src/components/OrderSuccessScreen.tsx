import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Order } from '../types';

interface OrderSuccessScreenProps {
  order: Order;
  onContinueShopping: () => void;
  onViewAccount: () => void;
}

export const OrderSuccessScreen: React.FC<OrderSuccessScreenProps> = ({
  order,
  onContinueShopping,
  onViewAccount,
}) => {
  useEffect(() => {
    // Fire confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#b02f00', '#ff5722', '#006d2f', '#ffdbd1'],
      });
    } catch {
      // ignore
    }
  }, []);

  return (
    <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-8 md:py-12 pb-24 md:pb-16 space-y-6">
      <div className="bg-white rounded-3xl p-6 md:p-10 border border-[#e4beb4]/50 shadow-md text-center space-y-6">
        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-[#5dfd8a]/40 text-[#006d2f] mx-auto flex items-center justify-center shadow-xs">
          <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            check_circle
          </span>
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#006d2f] bg-[#5dfd8a]/30 px-3 py-1 rounded-full">
            Payment Confirmed
          </span>
          <h1 className="font-display font-black text-2xl md:text-3xl text-[#1c1b1b] mt-3">
            Thank You for Your Order!
          </h1>
          <p className="text-sm text-[#5b4039] mt-1">
            Order <strong className="text-[#1c1b1b]">{order.id}</strong> has been received and is being prepared for dispatch.
          </p>
        </div>

        {/* Shipment Details Box */}
        <div className="bg-[#fcf9f8] p-5 rounded-2xl border border-[#e4beb4]/40 text-left space-y-3">
          <div className="flex justify-between items-center text-xs pb-3 border-b border-[#ebe7e7]">
            <span className="text-[#5b4039]">Carrier &amp; Tracking:</span>
            <span className="font-mono font-bold text-[#b02f00]">
              {order.carrier} ({order.trackingNumber})
            </span>
          </div>
          <div className="flex justify-between items-center text-xs pb-3 border-b border-[#ebe7e7]">
            <span className="text-[#5b4039]">Estimated Delivery:</span>
            <span className="font-bold text-[#006d2f]">Within 2 - 3 Business Days</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#5b4039]">Delivering To:</span>
            <span className="font-medium text-[#1c1b1b] text-right">
              {order.formData.fullName}, {order.formData.city} ({order.formData.pincode})
            </span>
          </div>
        </div>

        {/* WhatsApp Notification confirmation simulator */}
        <div className="bg-[#25D366]/10 p-4 rounded-xl border border-[#25D366]/30 flex items-center justify-between text-left gap-3">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 fill-[#25D366] shrink-0" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"></path>
            </svg>
            <div>
              <p className="text-xs font-bold text-[#1c1b1b]">Instant Order Updates on WhatsApp</p>
              <p className="text-[11px] text-[#5b4039]">Sent to +91 {order.formData.phoneNumber}</p>
            </div>
          </div>
          <span className="text-xs font-bold text-[#006d2f] shrink-0">Active ✓</span>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={onViewAccount}
            className="flex-1 bg-white border-2 border-[#b02f00] text-[#b02f00] font-sans font-bold text-xs py-3.5 rounded-lg hover:bg-[#ffdbd1]/30 transition-all cursor-pointer"
          >
            Track Order in Account
          </button>
          <button
            onClick={onContinueShopping}
            className="flex-1 bg-[#b02f00] hover:bg-[#862200] text-white font-sans font-bold text-xs py-3.5 rounded-lg transition-all cursor-pointer shadow-sm"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </main>
  );
};
