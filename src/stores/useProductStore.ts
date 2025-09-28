// src/store/useShopStore.ts
import { create } from 'zustand';

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

interface FilterOptions {
  search?: string;
  categories?: string[];
  minRating?: number; // e.g. 4 means >= 4 stars
  priceRange?: [number, number]; // [min, max]
  onlyDiscounted?: boolean;
}

interface ShopState {
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

export const useShopStore = create<ShopState>((set, get) => ({
  originalProducts: [],
  products: [],
  discountedItems: [],
  popularItems: [],
  cart: [],

  fetchProducts: async () => {
    try {
      const res = await fetch('https://fakestoreapi.com/products');
      const data: Product[] = await res.json();

      const productsCopy = data.map((p) => ({ ...p }));
      const shuffled = [...productsCopy].sort(() => 0.5 - Math.random());

      const discounts = [
        { label: 'Up to 35% off', percent: 0.35 },
        { label: 'Up to 15% off', percent: 0.15 },
        { label: 'Up to 15% off', percent: 0.15 },
        { label: 'Up to 10% off', percent: 0.1 },
        { label: 'Up to 10% off', percent: 0.1 },
      ];

      discounts.forEach((d, i) => {
        const target = productsCopy.find((p) => p.id === shuffled[i].id);
        if (target) {
          target.discount = d.label;
          target.discountPercent = d.percent;
        }
      });

      const discountedItems = productsCopy.filter((p) => p.discount);

      const popularItems = [...productsCopy]
        .sort((a, b) => {
          const ac = a.rating?.count ?? 0;
          const bc = b.rating?.count ?? 0;
          if (bc === ac) {
            const ar = a.rating?.rate ?? 0;
            const br = b.rating?.rate ?? 0;
            return br - ar;
          }
          return bc - ac;
        })
        .slice(0, 3);

      const shuffledIds = [...productsCopy]
        .sort(() => 0.5 - Math.random())
        .map((p) => p.id);
      const initialCartIds = Array.from(new Set(shuffledIds)).slice(0, 2);
      const initialCart: CartEntry[] = initialCartIds.map((id) => ({
        id,
        count: 1,
      }));

      set({
        originalProducts: productsCopy,
        products: [...productsCopy],
        discountedItems,
        popularItems,
        cart: initialCart,
      });
    } catch (err) {
      console.error('fetchProducts failed:', err);
    }
  },

  addToCart: (productId, qty = 1) => {
    const { cart } = get();
    const existing = cart.find((c) => c.id === productId);
    if (existing) {
      set({
        cart: cart.map((c) =>
          c.id === productId ? { ...c, count: c.count + qty } : c
        ),
      });
    } else {
      set({ cart: [...cart, { id: productId, count: qty }] });
    }
  },

  removeFromCart: (productId) =>
    set((state) => ({ cart: state.cart.filter((c) => c.id !== productId) })),

  updateCount: (productId, count) => {
    if (count <= 0) {
      set((state) => ({ cart: state.cart.filter((c) => c.id !== productId) }));
      return;
    }
    set((state) => ({
      cart: state.cart.map((c) => (c.id === productId ? { ...c, count } : c)),
    }));
  },

  clearCart: () => set({ cart: [] }),

  // 🔹 general filter system
  filterProducts: (filters) => {
    const { originalProducts } = get();
    let filtered = [...originalProducts];

    if (!filters) {
      set({ products: filtered });
      return;
    }

    const { search, categories, minRating, priceRange, onlyDiscounted } =
      filters;

    if (search) {
      const query = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    if (categories && categories.length > 0) {
      filtered = filtered.filter((p) => categories.includes(p.category));
    }

    if (minRating) {
      filtered = filtered.filter((p) => (p.rating?.rate ?? 0) >= minRating);
    }

    if (priceRange) {
      const [min, max] = priceRange;
      filtered = filtered.filter((p) => p.price >= min && p.price <= max);
    }

    if (onlyDiscounted) {
      filtered = filtered.filter((p) => p.discountPercent);
    }

    set({ products: filtered });
  },

  resetFilters: () => {
    const { originalProducts } = get();
    set({ products: [...originalProducts] });
  },

  getCartDetails: () => {
    const { cart, products } = get();
    return cart.map(({ id, count }) => {
      const product = products.find((p) => p.id === id);
      const fallback: Product = {
        id,
        title: 'Unknown product',
        price: 0,
        description: '',
        category: '',
        image: '',
      };
      const prod = product ?? fallback;
      return {
        product: prod,
        count,
        subtotal: (prod.price ?? 0) * count,
      };
    });
  },

  totalAmount: () => {
    const details = get().getCartDetails();
    return details.reduce((acc, d) => acc + d.subtotal, 0);
  },

  totalCount: () => get().cart.reduce((acc, c) => acc + c.count, 0),

  getSummary: () => {
    const { cart, products } = get();

    let originalPrice = 0;
    let discountedTotal = 0;

    cart.forEach(({ id, count }) => {
      const product = products.find((p) => p.id === id);
      if (!product) return;

      const price = product.price * count;
      originalPrice += price;

      if (product.discountPercent) {
        const discountAmount = price * product.discountPercent;
        discountedTotal += price - discountAmount;
      } else {
        discountedTotal += price;
      }
    });

    const savings = originalPrice - discountedTotal;
    const storePickup = 140;
    const tax = discountedTotal * 0.08;
    const total = discountedTotal + storePickup + tax;

    return {
      originalPrice,
      savings,
      storePickup,
      tax,
      total,
    };
  },
}));
