import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import  './helper'
import router from './router'
import store from './store'
import Vuesax from 'vuesax'
import { vsButton, vsSelect, vsPopup } from 'vuesax'
import 'vuesax/dist/vuesax.css'

Vue.config.productionTip = false

Vue.use(Vuesax)
Vue.use(vsButton)
Vue.use(vsSelect)
Vue.use(vsPopup)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowRight, faArrowLeft, faArrowUp, faArrowDown ,faEdit,faPlus} from '@fortawesome/free-solid-svg-icons'
library.add(faArrowRight, faArrowLeft, faArrowUp, faArrowDown,faEdit,faPlus)
Vue.component('font-awesome-icon', FontAwesomeIcon)

