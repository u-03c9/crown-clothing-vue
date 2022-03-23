import { CollectionItem } from "./shopStore";
import { defineStore } from "pinia";

export interface CartItem extends CollectionItem {
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

  getters: {
    itemsCount(): number {
      return this.items.reduce((accumlator, item) => {
        return accumlator + item.quantity;
      }, 0);
    },
    cartTotal(): number {
      return this.items.reduce((accumlator, cartItem) => {
        return accumlator + cartItem.quantity * cartItem.price;
      }, 0);
    },
  },

  actions: {
    closeMenu() {
      this.isMenuOpen = false;
    },

    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },

    findIdxOfCartItem(item: CollectionItem): number {
      return this.items.findIndex(({ id }) => id === item.id);
    },

    addItemToCart(item: CollectionItem) {
      const idx = this.findIdxOfCartItem(item);
      if (idx !== -1) {
        this.items[idx].quantity += 1;
      } else {
        this.items.push({ ...item, quantity: 1 });
      }
    },

    removeItemFromCart(item: CollectionItem) {
      const idx = this.findIdxOfCartItem(item);
      if (idx === -1) return;
      if (this.items[idx].quantity == 1) {
        this.items.splice(idx, 1);
      } else {
        this.items[idx].quantity -= 1;
      }
    },

    clearItemFromCart(item: CollectionItem) {
      const idx = this.findIdxOfCartItem(item);
      if (idx === -1) return;
      this.items.splice(idx, 1);
    },
  },
});

export default useCartStore;
