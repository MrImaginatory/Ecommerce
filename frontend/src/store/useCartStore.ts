import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/components/ProductCard/ProductCard";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, quantity) => {
        set((state) => {
          const maxAllowed = Math.min(product.stockQty ?? 999, product.maxOrderQty ?? 999);
          const existingItem = state.items.find((item) => item.product.id === product.id);
          
          if (existingItem) {
            const newTotalQuantity = Math.min(maxAllowed, existingItem.quantity + quantity);
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: newTotalQuantity }
                  : item
              ),
            };
          }
          
          const cappedQuantity = Math.min(maxAllowed, quantity);
          return { items: [...state.items, { product, quantity: cappedQuantity }] };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items.map((item) => {
            if (item.product.id === productId) {
              const maxAllowed = Math.min(item.product.stockQty ?? 999, item.product.maxOrderQty ?? 999);
              return { ...item, quantity: Math.min(maxAllowed, Math.max(1, quantity)) };
            }
            return item;
          }),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: "apple-ecommerce-cart",
    }
  )
);
