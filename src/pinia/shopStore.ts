import { defineStore } from "pinia";

import { fetchCollections } from "./../firebase/utils_firestore";

export interface Collections {
  [collectionName: string]: Collection;
}

export interface Collection {
  readonly id: string;
  readonly routeName: string;
  readonly title: string;
  readonly items: CollectionItem[];
}

export interface CollectionItem {
  readonly id: string;
  readonly imageUrl: string;
  readonly name: string;
  readonly price: number;
}

interface State {
  collections: Collections | null;
}

const useShopStore = defineStore("collections", {
  state: (): State => ({
    collections: null,
  }),
  actions: {
    async getCollections() {
      if (!this.collections) {
        this.collections = await fetchCollections();
      }
      return this.collections;
    },
    async getCollectionById(collectionId: string): Promise<Collection | null> {
      if (!this.collections) await this.getCollections();
      if (!this.collections) return null;
      return this.collections![collectionId];
    },
  },
});

export default useShopStore;
