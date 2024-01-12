import Vue from 'vue'

// axios
import axios from 'axios'
const token = localStorage.getItem('token')

const axiosIns = axios.create({
    // You can add your headers here
    // ================================
    baseURL:  "http://127.0.0.1:8081/",
    // timeout: 1000,
    headers: { 'Token': token }
})

Vue.prototype.$http = axiosIns

export default axiosIns
