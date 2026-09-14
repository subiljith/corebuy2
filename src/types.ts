export type CategoryType = 'all' | 'footwear' | 'apparel' | 'accessories' | 'equipment' | 'training' | string;

export interface CategoryItem {
  id: CategoryType;
  label: string;
  name?: string;
  slug?: string;
  image?: string;
  count?: string;
  created_at?: string;
}

export interface ProductSize {
  label: string;
  available: boolean;
  note?: string; // e.g. "Few Left"
}

export interface ProductGalleryItem {
  url: string;
  alt?: string;
  type?: 'image' | 'video' | string;
}

export interface Product {
  id: string;
  name: string;
  price: number;

  // Supabase Schema Fields
  category_id?: string;
  hsn_code?: string;
  is_active?: boolean;
  sale_price?: number;
  image_urls?: string[];
  created_at?: string;
  description?: string;

  // UI & Mock Fields
  brand?: string;
  category?: CategoryType;
  categoryLabel?: string;
  originalPrice?: number;
  discountPercent?: number;
  badge?: string;
  badgeType?: 'discount' | 'bestseller' | 'new' | string;
  rating?: number;
  reviewsCount?: number;
  image?: string;
  gallery?: ProductGalleryItem[];
  sizes?: ProductSize[];
  color?: string;
  fabricCare?: string[];
  replacementPolicy?: string;
  isTrending?: boolean;
}

export interface CartItem {
  id: string; // unique item instance id
  productId: string;
  product: Product;
  selectedSize: string;
  selectedColor?: string;
  quantity: number;
}

export interface CheckoutFormData {
  fullName: string;
  phoneNumber: string;
  houseNo: string;
  street: string;
  pincode: string;
  city: string;
  state: string;
  paymentMethod: 'razorpay' | 'cod' | string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  formData: CheckoutFormData;
  status: 'Order Confirmed' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'In Transit' | string;
  createdAt: string;
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
}

export type ViewScreen = 'home' | 'shop' | 'product-detail' | 'checkout' | 'wishlist' | 'account' | 'order-success' | 'admin';

export type AdminTab = 'overview' | 'products' | 'stock' | 'orders' | 'categories';

export interface ProductVariantItem {
  id?: string;
  product_id?: string;
  size: string;
  stock_quantity: number;
  created_at?: string;
}
