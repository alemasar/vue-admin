import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: ""
  },
  getters: {
    getToken (state) {
      console.log("HOLA ",state.token)
      return state.token;
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    }
  }
});
export default store;
