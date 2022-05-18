import { createStore } from "vuex";
const STORAGE_KEY = "listProduct";
export default createStore({
  state: {
    products: JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"),
    product: {
      id: Date.now(),
      name: "",
      price: "",
      quantity: "",
    },
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
