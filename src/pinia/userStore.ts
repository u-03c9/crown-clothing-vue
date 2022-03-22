import { defineStore } from "pinia";

const useUserStore = defineStore("user", {
  state: () => ({
    currentUser: false,
  }),
});

export default useUserStore;
