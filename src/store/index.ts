import axios from "axios";
import { createStore } from "vuex";
import { api } from "../api"
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
    productsAPI: [],
    productAPI: {
      name: "",
      price: "",
      quantity: "",
    },
  },
  getters: {},
  mutations: {
    SET_PRODUCTS(state, products) {
      state.productsAPI = products;
    },
    REMOVE_PRODUCT_API(state, productID) {
      state.productsAPI = state.productsAPI.filter(item => item["id"] != productID);
    },
    EDIT_PRODUCT_API(state) {
      return state.productsAPI;
    },
    ADD_PRODUCT_API(state) {
      return state.productsAPI;
    }
  },
  actions: {
    getProducts({commit}) {
      axios
        .get(`${api}`)
          .then((response) => {
            commit("SET_PRODUCTS", response.data);
          });
    },
    deleteProductAPI({commit}, id) {
      axios.delete(`${api}/${id}`)
        .then((response) => {
          commit("REMOVE_PRODUCT_API", response.data.id);
        })
    },
    editProductAPI({commit}, product) {
      axios.put(`${api}/${product.id}`, {
        name: product.name,
        price: product.price,
        quanity: product.quantity,
      })
        .then((response) => {
          commit("EDIT_PRODUCT_API", response.data);
        })
    },
    addProductAPI({commit}, product) {
      axios.post(`${api}`, {
        name: product.name,
        price: product.price,
        quanity: product.quantity,
      })
        .then((response) => {
          commit("ADD_PRODUCT_API", response.data);
        })
    },
  },
  modules: {},
});
