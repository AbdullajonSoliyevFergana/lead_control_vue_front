import axios from '@axios'

import api from "@/api/api";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
  namespaced: true,
  state: {
    menu_list: [],
    nav_list: []
  },
  getters: {
    getList(state) {
      return state.menu_list = []
    }
  },
  mutations: {
    loadData(state, data) {
      state.menu_list = data
    }
  },
  actions: {
    loadData (context, data) {
      context.commit('loadData', data)
    }
  },
}
