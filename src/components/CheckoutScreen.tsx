import React, { useState, useEffect } from 'react';
import { CartItem, CheckoutFormData, Order } from '../types';

interface CheckoutScreenProps {
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onPlaceOrder: (order: Order) => void;
  onBackToShop: () => void;
}

// Indian pincode mock directory for auto-filling City & State
const PINCODE_MAP: Record<string, { city: string; state: string }> = {
  '560038': { city: 'Bengaluru', state: 'Karnataka' },
  '560001': { city: 'Bengaluru', state: 'Karnataka' },
  '110001': { city: 'New Delhi', state: 'Delhi' },
  '400001': { city: 'Mumbai', state: 'Maharashtra' },
  '600001': { city: 'Chennai', state: 'Tamil Nadu' },
  '700001': { city: 'Kolkata', state: 'West Bengal' },
  '500001': { city: 'Hyderabad', state: 'Telangana' },
  '380001': { city: 'Ahmedabad', state: 'Gujarat' },
  '682001': { city: 'Kochi', state: 'Kerala' },
  '411001': { city: 'Pune', state: 'Maharashtra' },
};

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  cart,
  onPlaceOrder,
  onBackToShop,
}) => {
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: 'Virat Kohli',
    phoneNumber: '98765 43210',
    houseNo: 'A-402, Highrise Apt',
    street: 'MG Road, Indiranagar',
    pincode: '560038',
    city: 'Bengaluru',
    state: 'Karnataka',
    paymentMethod: 'razorpay',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [activePaymentTab, setActivePaymentTab] = useState<'upi' | 'card' | 'qr'>('upi');
  const [upiId, setUpiId] = useState('virat@okaxis');
  const [cardNumber, setCardNumber] = useState('4532 8900 1234 5678');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('888');

  // Auto-fill City/State based on Pincode
  useEffect(() => {
    const cleanPin = formData.pincode.replace(/\s+/g, '');
    if (cleanPin.length === 6 && PINCODE_MAP[cleanPin]) {
      setFormData((prev) => ({
        ...prev,
        city: PINCODE_MAP[cleanPin].city,
        state: PINCODE_MAP[cleanPin].state,
      }));
    }
  }, [formData.pincode]);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 999 ? 0 : 99;
  const tax = Math.round(subtotal * 0.05); // 5% GST on sportswear
  const total = subtotal + shipping + tax;

  const handleInputChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleInitiateRazorpay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phoneNumber || !formData.pincode || !formData.houseNo) {
      alert('Please fill out all delivery address fields.');
      return;
    }
    setFormData((prev) => ({ ...prev, paymentMethod: 'razorpay' }));
    setShowPaymentModal(true);
  };

  const handleCashOnDelivery = () => {
    if (!formData.fullName || !formData.phoneNumber || !formData.pincode || !formData.houseNo) {
      alert('Please fill out all delivery address fields.');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      const newOrder: Order = {
        id: `CB-ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        items: [...cart],
        subtotal,
        tax,
        shipping,
        total,
        formData: { ...formData, paymentMethod: 'cod' },
        status: 'Order Confirmed',
        createdAt: new Date().toISOString(),
        trackingNumber: `DEL-${Math.floor(10000000 + Math.random() * 90000000)}`,
        carrier: 'Delhivery Express Surface',
        estimatedDelivery: '3 Business Days',
      };
      setIsProcessing(false);
      onPlaceOrder(newOrder);
    }, 1200);
  };

  const handleCompleteOnlinePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setShowPaymentModal(false);
      const newOrder: Order = {
        id: `CB-ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        items: [...cart],
        subtotal,
        tax,
        shipping,
        total,
        formData: { ...formData, paymentMethod: 'razorpay' },
        status: 'Order Confirmed',
        createdAt: new Date().toISOString(),
        trackingNumber: `DEL-${Math.floor(10000000 + Math.random() * 90000000)}`,
        carrier: 'Delhivery Express Air',
        estimatedDelivery: '2 Business Days',
      };
      setIsProcessing(false);
      onPlaceOrder(newOrder);
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <main className="flex-1 w-full max-w-xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-2xl p-10 border border-[#e4beb4]/50 shadow-xs">
          <span className="material-symbols-outlined text-6xl text-[#b02f00] mb-4">
            shopping_bag
          </span>
          <h2 className="font-display font-bold text-2xl text-[#1c1b1b]">Your Bag is Empty</h2>
          <p className="text-sm text-[#5b4039] mt-2 mb-6">
            Looks like you haven't added any high-performance gear yet.
          </p>
          <button
            onClick={onBackToShop}
            className="bg-[#b02f00] text-white font-bold text-sm px-8 py-3.5 rounded-lg hover:bg-[#862200] transition-colors cursor-pointer"
          >
            Explore Performance Collection
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-16 py-6 md:py-10 pb-28 md:pb-16">
      {/* Progress Indicator */}
      <div className="w-full max-w-3xl mx-auto mb-10 hidden md:block">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-[#ebe7e7] rounded-full -z-10" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-1 bg-[#b02f00] rounded-full -z-10" />

          {/* Step 1: Cart */}
          <div className="flex flex-col items-center gap-1.5 bg-[#fcf9f8] px-2">
            <div className="w-8 h-8 rounded-full bg-[#b02f00] text-white flex items-center justify-center text-xs font-bold shadow-xs">
              <span className="material-symbols-outlined text-base">check</span>
            </div>
            <span className="text-xs font-medium text-[#1c1b1b]">Cart</span>
          </div>

          {/* Step 2: Checkout */}
          <div className="flex flex-col items-center gap-1.5 bg-[#fcf9f8] px-2">
            <div className="w-8 h-8 rounded-full bg-[#b02f00] text-white border-2 border-[#fcf9f8] flex items-center justify-center text-xs font-bold ring-2 ring-[#b02f00] shadow-xs">
              2
            </div>
            <span className="text-xs font-bold text-[#b02f00]">Checkout</span>
          </div>

          {/* Step 3: Payment */}
          <div className="flex flex-col items-center gap-1.5 bg-[#fcf9f8] px-2">
            <div className="w-8 h-8 rounded-full bg-[#e5e2e1] text-[#5b4039] flex items-center justify-center text-xs font-bold">
              3
            </div>
            <span className="text-xs font-medium text-[#5b4039]">Payment</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Customer Details Form */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h1 className="font-display font-extrabold text-2xl md:text-3xl text-[#1c1b1b]">
              Delivery Information
            </h1>
            <p className="text-sm text-[#5b4039]">
              Enter your details to ensure lightning-fast delivery across India.
            </p>
          </div>

          <form
            onSubmit={handleInitiateRazorpay}
            className="bg-white shadow-[0px_4px_20px_rgba(0,0,0,0.04)] rounded-2xl p-6 md:p-8 border border-[#e4beb4]/40 flex flex-col gap-6"
          >
            {/* Contact Section */}
            <div className="flex flex-col gap-4 border-b border-[#ebe7e7] pb-6">
              <h2 className="font-display font-bold text-base md:text-lg text-[#1c1b1b]">
                Contact Details
              </h2>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#1c1b1b]" htmlFor="fullName">
                  Full Name
                </label>
                <input
                  id="fullName"
                  className="sport-input w-full bg-white rounded-lg px-4 py-3 text-sm text-[#1c1b1b] placeholder:text-[#5b4039]/40"
                  placeholder="Virat Kohli"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#1c1b1b]" htmlFor="phone">
                  Phone Number
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#5b4039] border-r border-[#e4beb4] pr-2.5">
                    +91
                  </span>
                  <input
                    id="phone"
                    className="sport-input w-full bg-white rounded-lg pl-16 pr-4 py-3 text-sm text-[#1c1b1b] placeholder:text-[#5b4039]/40"
                    placeholder="98765 43210"
                    type="tel"
                    required
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-[#006d2f]">
                  <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"></path>
                  </svg>
                  <span className="text-[11px] font-semibold">
                    WhatsApp & SMS updates will be sent here for order tracking.
                  </span>
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="flex flex-col gap-4">
              <h2 className="font-display font-bold text-base md:text-lg text-[#1c1b1b]">
                Shipping Address
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#1c1b1b]" htmlFor="houseNo">
                    House/Flat No.
                  </label>
                  <input
                    id="houseNo"
                    className="sport-input w-full bg-white rounded-lg px-4 py-3 text-sm text-[#1c1b1b] placeholder:text-[#5b4039]/40"
                    placeholder="A-402, Highrise Apt"
                    type="text"
                    required
                    value={formData.houseNo}
                    onChange={(e) => handleInputChange('houseNo', e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#1c1b1b]" htmlFor="street">
                    Street/Locality
                  </label>
                  <input
                    id="street"
                    className="sport-input w-full bg-white rounded-lg px-4 py-3 text-sm text-[#1c1b1b] placeholder:text-[#5b4039]/40"
                    placeholder="MG Road, Indiranagar"
                    type="text"
                    required
                    value={formData.street}
                    onChange={(e) => handleInputChange('street', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#1c1b1b]" htmlFor="pincode">
                    Pincode (6-digit)
                  </label>
                  <input
                    id="pincode"
                    className="sport-input w-full bg-white rounded-lg px-4 py-3 text-sm text-[#1c1b1b] placeholder:text-[#5b4039]/40 tracking-widest font-mono font-bold"
                    maxLength={6}
                    placeholder="560038"
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => handleInputChange('pincode', e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#1c1b1b]" htmlFor="city">
                    City
                  </label>
                  <input
                    id="city"
                    className="sport-input w-full bg-[#f0edec] rounded-lg px-4 py-3 text-sm text-[#1c1b1b] font-medium"
                    placeholder="Bengaluru"
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#1c1b1b]" htmlFor="state">
                    State
                  </label>
                  <input
                    id="state"
                    className="sport-input w-full bg-[#f0edec] rounded-lg px-4 py-3 text-sm text-[#1c1b1b] font-medium"
                    placeholder="Karnataka"
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 relative">
          <div className="bg-white shadow-[0px_12px_40px_rgba(0,0,0,0.06)] rounded-2xl border border-[#e4beb4]/40 flex flex-col sticky top-24 overflow-hidden">
            {/* Header */}
            <div className="p-5 border-b border-[#ebe7e7] bg-[#f0edec]/50 flex items-center justify-between">
              <h2 className="font-display font-bold text-lg text-[#1c1b1b]">
                Order Summary
              </h2>
              <span className="text-xs font-bold bg-[#ffdbd1] text-[#b02f00] px-2.5 py-1 rounded-full">
                {cart.reduce((s, i) => s + i.quantity, 0)} Items
              </span>
            </div>

            {/* Line Items Scrollable List */}
            <div className="p-5 flex flex-col gap-4 border-b border-[#ebe7e7] max-h-[320px] overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-[#F1F3F5] rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-1.5 border border-[#ebe7e7]">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-contain mix-blend-multiply drop-shadow-sm"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-xs md:text-sm text-[#1c1b1b] truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] text-[#5b4039] mt-0.5">
                      Size: <span className="font-semibold text-[#1c1b1b]">{item.selectedSize}</span>
                    </p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-[11px] text-[#5b4039] bg-[#f0edec] px-2 py-0.5 rounded">
                        Qty: {item.quantity}
                      </span>
                      <span className="font-display font-bold text-sm text-[#1c1b1b]">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cost Breakdown */}
            <div className="p-5 flex flex-col gap-2.5 border-b border-[#ebe7e7] bg-white text-xs md:text-sm">
              <div className="flex justify-between items-center text-[#5b4039]">
                <span>Subtotal</span>
                <span className="font-semibold text-[#1c1b1b]">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between items-center text-[#5b4039]">
                <span>Shipping (Express)</span>
                <span className="font-bold text-[#006d2f]">
                  {shipping === 0 ? 'FREE' : `₹${shipping}`}
                </span>
              </div>
              <div className="flex justify-between items-center text-[#5b4039]">
                <span>Estimated GST Tax (5%)</span>
                <span className="font-semibold text-[#1c1b1b]">
                  ₹{tax.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Total & CTAs */}
            <div className="p-5 bg-[#fcf9f8] flex flex-col gap-4">
              <div className="flex justify-between items-end">
                <span className="text-sm font-semibold text-[#1c1b1b]">Total to Pay</span>
                <span className="font-display font-black text-2xl md:text-3xl text-[#b02f00]">
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex flex-col gap-2.5 mt-1">
                {/* Primary Button: Razorpay */}
                <button
                  id="checkout-razorpay-btn"
                  onClick={handleInitiateRazorpay}
                  disabled={isProcessing}
                  className="w-full bg-[#b02f00] hover:bg-[#862200] text-white font-sans font-bold text-sm py-4 rounded-lg shadow-[0px_4px_20px_rgba(176,47,0,0.25)] hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span
                    className="material-symbols-outlined text-lg"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    lock
                  </span>
                  Pay via UPI / Cards (Razorpay)
                  <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>

                {/* Secondary Button: Cash on Delivery */}
                <button
                  id="checkout-cod-btn"
                  onClick={handleCashOnDelivery}
                  disabled={isProcessing}
                  className="w-full bg-white border-2 border-[#b02f00] text-[#b02f00] font-sans font-bold text-sm py-3.5 rounded-lg hover:bg-[#ffdbd1]/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">local_shipping</span>
                  Cash on Delivery
                </button>
              </div>

              {/* Trust Indicator */}
              <div className="flex items-start gap-2.5 mt-1 bg-[#5dfd8a]/20 p-3 rounded-lg border border-[#006d2f]/20">
                <span
                  className="material-symbols-outlined text-[#006d2f] text-lg mt-0.5"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified_user
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#006d2f]">
                    100% Secure Transaction
                  </span>
                  <span className="text-[10.5px] text-[#5b4039] leading-tight">
                    Your payment details are encrypted using industry-standard 256-bit SSL technology.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simulated Razorpay Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-[#e4beb4] animate-in fade-in zoom-in duration-200">
            {/* Razorpay Brand Header */}
            <div className="bg-[#0c2340] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#b02f00] text-white flex items-center justify-center font-black text-sm">
                  CB
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight">CoreBuy India Pvt Ltd</h3>
                  <p className="text-[11px] text-white/70">Razorpay Trusted Merchant</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-white/70 block">Amount</span>
                <span className="font-display font-extrabold text-lg text-[#66ff8e]">
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Payment Method Tabs */}
            <div className="flex border-b border-[#e5e2e1] bg-[#fcf9f8]">
              <button
                onClick={() => setActivePaymentTab('upi')}
                className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors cursor-pointer ${
                  activePaymentTab === 'upi'
                    ? 'border-[#b02f00] text-[#b02f00] bg-white'
                    : 'border-transparent text-[#5b4039]'
                }`}
              >
                UPI (GPay / PhonePe)
              </button>
              <button
                onClick={() => setActivePaymentTab('qr')}
                className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors cursor-pointer ${
                  activePaymentTab === 'qr'
                    ? 'border-[#b02f00] text-[#b02f00] bg-white'
                    : 'border-transparent text-[#5b4039]'
                }`}
              >
                Scan UPI QR
              </button>
              <button
                onClick={() => setActivePaymentTab('card')}
                className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors cursor-pointer ${
                  activePaymentTab === 'card'
                    ? 'border-[#b02f00] text-[#b02f00] bg-white'
                    : 'border-transparent text-[#5b4039]'
                }`}
              >
                Debit / Credit Card
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              {activePaymentTab === 'upi' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setUpiId('athlete@okhdfcbank')}
                      className="p-2.5 rounded-lg border border-[#e4beb4] hover:border-[#b02f00] text-center text-xs font-semibold bg-[#fcf9f8]"
                    >
                      Google Pay
                    </button>
                    <button
                      onClick={() => setUpiId('athlete@ybl')}
                      className="p-2.5 rounded-lg border border-[#e4beb4] hover:border-[#b02f00] text-center text-xs font-semibold bg-[#fcf9f8]"
                    >
                      PhonePe
                    </button>
                    <button
                      onClick={() => setUpiId('athlete@paytm')}
                      className="p-2.5 rounded-lg border border-[#e4beb4] hover:border-[#b02f00] text-center text-xs font-semibold bg-[#fcf9f8]"
                    >
                      Paytm UPI
                    </button>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#1c1b1b]">Enter UPI ID / VPA</label>
                    <input
                      type="text"
                      className="sport-input w-full px-3.5 py-2.5 rounded-lg text-sm bg-white text-[#1c1b1b]"
                      placeholder="e.g. yourname@oksbi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                  </div>
                  <p className="text-[11px] text-[#5b4039]">
                    A payment request will be sent to your UPI application. Approve to instantly verify.
                  </p>
                </div>
              )}

              {activePaymentTab === 'qr' && (
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-44 h-44 bg-white p-3 border-2 border-dashed border-[#b02f00] rounded-xl flex items-center justify-center shadow-inner">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      {/* Stylized QR Code Pattern */}
                      <rect x="0" y="0" width="30" height="30" fill="#1c1b1b" />
                      <rect x="5" y="5" width="20" height="20" fill="white" />
                      <rect x="10" y="10" width="10" height="10" fill="#b02f00" />
                      
                      <rect x="70" y="0" width="30" height="30" fill="#1c1b1b" />
                      <rect x="75" y="5" width="20" height="20" fill="white" />
                      <rect x="80" y="10" width="10" height="10" fill="#b02f00" />
                      
                      <rect x="0" y="70" width="30" height="30" fill="#1c1b1b" />
                      <rect x="5" y="75" width="20" height="20" fill="white" />
                      <rect x="10" y="80" width="10" height="10" fill="#b02f00" />

                      <rect x="35" y="10" width="10" height="10" fill="#1c1b1b" />
                      <rect x="50" y="15" width="10" height="10" fill="#1c1b1b" />
                      <rect x="35" y="35" width="30" height="30" fill="#ff5722" />
                      <rect x="40" y="40" width="20" height="20" fill="white" />
                      <rect x="45" y="45" width="10" height="10" fill="#b02f00" />
                      <rect x="15" y="45" width="10" height="10" fill="#1c1b1b" />
                      <rect x="75" y="45" width="10" height="10" fill="#1c1b1b" />
                      <rect x="40" y="75" width="15" height="15" fill="#1c1b1b" />
                      <rect x="65" y="75" width="25" height="15" fill="#1c1b1b" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-[#1c1b1b]">Scan with any UPI App</span>
                  <p className="text-[11px] text-[#5b4039]">Supports Google Pay, PhonePe, Paytm, BHIM & Cred</p>
                </div>
              )}

              {activePaymentTab === 'card' && (
                <div className="space-y-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#1c1b1b]">Card Number</label>
                    <input
                      type="text"
                      className="sport-input w-full px-3.5 py-2.5 rounded-lg text-sm bg-white tracking-widest font-mono"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-[#1c1b1b]">Expiry</label>
                      <input
                        type="text"
                        className="sport-input w-full px-3.5 py-2.5 rounded-lg text-sm bg-white"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-[#1c1b1b]">CVV</label>
                      <input
                        type="password"
                        maxLength={4}
                        className="sport-input w-full px-3.5 py-2.5 rounded-lg text-sm bg-white"
                        placeholder="•••"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons inside Modal */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 py-3 border border-[#e4beb4] text-[#5b4039] rounded-lg text-xs font-bold hover:bg-[#f0edec] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCompleteOnlinePayment}
                  disabled={isProcessing}
                  className="flex-1 py-3 bg-[#b02f00] hover:bg-[#862200] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  {isProcessing ? (
                    <>
                      <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>
                      Verifying...
                    </>
                  ) : (
                    `Pay ₹${total.toLocaleString('en-IN')}`
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
