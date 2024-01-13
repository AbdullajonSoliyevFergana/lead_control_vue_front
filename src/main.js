import Vue from 'vue'
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'

// import i18n from '@/libs/i18n'
import router from './router'
import store from './store'
import Index from './Index.vue'

// Global Components
import './global-components'

// 3rd party plugins
import '@axios'
// import '@/libs/acl'
import '@/libs/portal-vue'
import '@/libs/clipboard'
import '@/libs/toastification'
import '@/libs/sweet-alerts'
import '@/libs/vue-select'
import '@/libs/tour'
import api from "@/api/api";
// socket.io

import moment from 'moment';
import io from 'socket.io-client';


Vue.prototype.$socket = io(`http://leadsocket.abdullajonsoliyev.uz:3000/`);

Vue.prototype.$moment = moment;

// confetti
import VueConfetti from 'vue-confetti'
Vue.use(VueConfetti)

// Axios Mock Adapter
import '@/@fake-db/db'

// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)

// Composition API
Vue.use(VueCompositionAPI)

// Feather font icon - For form-wizard
// * Shall remove it if not using font-icons of feather-icons - For form-wizard
require('@core/assets/fonts/feather/iconfont.css') // For form-wizard

// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

Vue.config.productionTip = false

new Vue({
    router,
    store,
    // i18n,
    render: h => h(Index),
}).$mount('#app')