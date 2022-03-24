import { defineStore } from "pinia";

interface State {
  timer: NodeJS.Timeout | null;
  showToast: boolean;
  msg: string;
}

const useToastStore = defineStore("toast", {
  state: (): State => ({
    timer: null,
    showToast: false,
    msg: "",
  }),

  actions: {
    displayToast(msg: any, time: number = 3) {
      this.showToast = true;

      if (msg instanceof Error) this.msg = msg.message;
      else this.msg = msg;

      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.dismissToast();
      }, time * 1000);
    },

    dismissToast() {
      if (this.timer) clearTimeout(this.timer);
      this.showToast = false;
      this.msg = "";
    },
  },
});

export default useToastStore;
