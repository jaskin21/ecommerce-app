
export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
  discount?: string;
  discountPercent?: number;
};

export type CartEntry = {
  id: number;
  count: number;
};

export type CartDetail = {
  product: Product;
  count: number;
  subtotal: number;
};

 export interface FilterOptions {
  search?: string;
  categories?: string[];
  minRating?: number; // e.g. 4 means >= 4 stars
  priceRange?: [number, number]; // [min, max]
  onlyDiscounted?: boolean;
}

export interface ShopState {
  originalProducts: Product[];
  products: Product[];
  discountedItems: Product[];
  popularItems: Product[];
  cart: CartEntry[];

  // actions
  fetchProducts: () => Promise<void>;
  addToCart: (productId: number, qty?: number) => void;
  removeFromCart: (productId: number) => void;
  updateCount: (productId: number, count: number) => void;
  clearCart: () => void;

  // filters
  filterProducts: (filters?: FilterOptions) => void;
  resetFilters: () => void;

  // readers
  getCartDetails: () => CartDetail[];
  totalAmount: () => number;
  totalCount: () => number;

  getSummary: () => {
    originalPrice: number;
    savings: number;
    storePickup: number;
    tax: number;
    total: number;
  };
}