import { CollectionItem } from "./shopStore";
import { defineStore } from "pinia";

export interface CartItem {
  item: CollectionItem;
  quantity: number;
}

interface State {
  isMenuOpen: boolean;
  items: CartItem[];
}

const useCartStore = defineStore("cart", {
  state: (): State => ({
    isMenuOpen: false,
    items: [],
  }),

  actions: {
    closeMenu() {
      this.isMenuOpen = false;
    },

    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },

    itemsCount(): number {
      return this.items.reduce((accumlator, item) => {
        return accumlator + item.quantity;
      }, 0);
    },

    addItemToCart(item: CollectionItem) {
      const idx = this.items.findIndex(({ item: { id } }) => id === item.id);

      if (idx > -1) {
        this.items[idx].quantity += 1;
      } else {
        this.items.push({ item, quantity: 1 });
      }
    },

    removeItemFromCart(item: CollectionItem) {
      const idx = this.items.findIndex(({ item: { id } }) => id === item.id);

      if (!idx) return;
      if (this.items[idx].quantity == 1) {
        this.items.splice(idx, 0);
      } else {
        this.items[idx].quantity -= 1;
      }
    },
  },
});

export default useCartStore;
