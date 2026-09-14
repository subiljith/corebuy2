import React, { useState } from 'react';
import { CartItem, Product } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onProceedToCheckout: () => void;
  onSelectProduct: (product: Product) => void;
  featuredProduct?: Product;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onSelectProduct,
  featuredProduct,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = cart.reduce((sum, item) => {
    const itemPrice = item.product?.price ?? item.product?.sale_price ?? 0;
    return sum + itemPrice * item.quantity;
  }, 0);
  const discountAmount = Math.round(rawSubtotal * appliedDiscount);
  const subtotal = rawSubtotal - discountAmount;
  const freeShippingThreshold = 999;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shipping = subtotal > freeShippingThreshold || subtotal === 0 ? 0 : 99;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'CORE10' || code === 'VELOCITY10') {
      setAppliedDiscount(0.1);
      setCouponSuccess('10% Athlete Discount Applied!');
    } else if (code === 'FREESHIP') {
      setAppliedDiscount(0.05);
      setCouponSuccess('Special Shipping Credit Applied!');
    } else {
      setCouponError('Invalid coupon. Try using CORE10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#fcf9f8] h-full shadow-2xl z-10 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 md:p-5 border-b border-[#e4beb4]/50 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#b02f00] text-2xl">shopping_bag</span>
            <h2 className="font-display font-bold text-lg text-[#1c1b1b]">
              Your Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#5b4039] hover:bg-[#f0edec] rounded-full transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Free shipping progress bar */}
        <div className="bg-[#f0edec] px-4 py-3 border-b border-[#e4beb4]/30">
          <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
            <span className="text-[#1c1b1b]">
              {remainingForFreeShipping === 0
                ? '🎉 You unlocked Free Express Shipping!'
                : `Add ₹${remainingForFreeShipping} more for FREE shipping`}
            </span>
            <span className="text-[#006d2f] font-bold">₹999 Min</span>
          </div>
          <div className="w-full bg-[#e5e2e1] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#006d2f] h-full transition-all duration-500 rounded-full"
              style={{
                width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%`,
              }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <span className="material-symbols-outlined text-6xl text-[#5b4039]/40 mb-3">
                shopping_cart
              </span>
              <h3 className="font-display font-bold text-base text-[#1c1b1b]">Your Bag is Empty</h3>
              <p className="text-xs text-[#5b4039] mt-1 mb-6">
                Discover our latest high-energy performance collection.
              </p>
              <button
                onClick={onClose}
                className="bg-[#b02f00] text-white text-xs font-bold px-6 py-2.5 rounded-lg"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const itemImg = item.product?.image || item.product?.image_urls?.[0] || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZHPcBLg82LJOsZP62wF2zZ6dYzUU54qtRgqB8IsBY6vj9OL1r6ZIzn30R1khuv997HVs3CnxbZT5MU4sXSs6JPCGz_J8s3u9tGU-SCY99cbpg21gz7DMmIGuKWEcHi6JnZ-TR1SxCyzGRTAIQoDo08Fi-zoDplDq4Ga0y_soXWvFBNqcdjVQPo8J5gd-7l52ZrBKZkhaNPJfd4QoDiEZwsTSjZ90glw-xi1yNYaxEBgF2Wv_-6Kg';
              const itemPrice = item.product?.price ?? item.product?.sale_price ?? 0;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-3.5 border border-[#e4beb4]/40 shadow-2xs flex gap-3.5 items-center"
                >
                  <div
                    onClick={() => {
                      onSelectProduct(item.product);
                      onClose();
                    }}
                    className="w-16 h-16 bg-[#F1F3F5] rounded-lg overflow-hidden shrink-0 flex items-center justify-center p-1 border border-[#e4beb4]/20 cursor-pointer hover:opacity-90"
                  >
                    <img
                      src={itemImg}
                      alt={item.product?.name || 'Product'}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4
                      onClick={() => {
                        onSelectProduct(item.product);
                        onClose();
                      }}
                      className="font-semibold text-xs md:text-sm text-[#1c1b1b] line-clamp-1 cursor-pointer hover:text-[#b02f00]"
                    >
                      {item.product?.name || 'Product'}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-[#5b4039]">
                      <span>Size: <strong className="text-[#1c1b1b]">{item.selectedSize}</strong></span>
                      <span>•</span>
                      <span className="font-bold text-[#1c1b1b]">₹{itemPrice.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-[#e4beb4] rounded-md overflow-hidden bg-[#f6f3f2]">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-2 py-0.5 text-xs font-bold text-[#5b4039] hover:bg-[#e5e2e1] active:bg-[#e4beb4]"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-bold text-[#1c1b1b] bg-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-2 py-0.5 text-xs font-bold text-[#5b4039] hover:bg-[#e5e2e1] active:bg-[#e4beb4]"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-xs text-[#ba1a1a] hover:underline flex items-center gap-0.5 p-1"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {/* Quick Add featured item */}
          {featuredProduct && (
            <div className="mt-6 pt-4 border-t border-[#e4beb4]/40">
              <span className="text-xs font-bold text-[#b02f00] uppercase tracking-wider block mb-2">
                Recommended Athlete Gear
              </span>
              <div
                onClick={() => {
                  onSelectProduct(featuredProduct);
                  onClose();
                }}
                className="bg-[#f0edec] p-3 rounded-xl flex items-center justify-between gap-3 cursor-pointer hover:bg-[#ebe7e7]"
              >
                <div className="w-12 h-12 bg-white rounded-lg p-1 shrink-0 flex items-center justify-center">
                  <img src={featuredProduct.image || featuredProduct.image_urls?.[0] || ''} alt={featuredProduct.name} className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#1c1b1b] truncate">{featuredProduct.name}</p>
                  <p className="text-[11px] text-[#5b4039]">₹{(featuredProduct.price ?? featuredProduct.sale_price ?? 0).toLocaleString('en-IN')}</p>
                </div>
                <button className="text-xs font-bold text-[#b02f00] px-2.5 py-1 bg-white rounded-md border border-[#e4beb4]">
                  View
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-4 md:p-5 border-t border-[#e4beb4]/50 bg-white space-y-3.5">
            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                placeholder="Coupon (try CORE10)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 uppercase text-xs px-3 py-2 bg-[#f6f3f2] border border-[#e4beb4] rounded-lg focus:outline-none focus:border-[#b02f00]"
              />
              <button
                type="submit"
                className="bg-[#1c1b1b] text-white text-xs font-bold px-3.5 py-2 rounded-lg hover:bg-black transition-colors"
              >
                Apply
              </button>
            </form>
            {couponError && <p className="text-[11px] text-[#ba1a1a] font-medium">{couponError}</p>}
            {couponSuccess && <p className="text-[11px] text-[#006d2f] font-semibold">{couponSuccess}</p>}

            {/* Price breakdown */}
            <div className="space-y-1.5 text-xs text-[#5b4039]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#1c1b1b]">₹{rawSubtotal.toLocaleString('en-IN')}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-[#006d2f] font-medium">
                  <span>Coupon Discount (10%)</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-semibold text-[#006d2f]">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between">
                <span>GST Tax (5%)</span>
                <span className="font-semibold text-[#1c1b1b]">₹{tax.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#1c1b1b] pt-2 border-t border-[#ebe7e7]">
                <span>Total Amount</span>
                <span className="font-display font-black text-base text-[#b02f00]">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Proceed to Checkout CTA */}
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full bg-[#b02f00] hover:bg-[#862200] text-white font-sans font-bold text-sm py-3.5 rounded-lg shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              PROCEED TO CHECKOUT
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
