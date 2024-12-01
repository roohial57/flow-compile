import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import  './helper'
import router from './router'
import store from './store'
import Vuesax from 'vuesax'
import { vsButton, vsSelect, vsPopup } from 'vuesax'
import 'vuesax/dist/vuesax.css'

import VueTailwind from 'vue-tailwind'
import {
  TInput,
  TTextarea,
  TSelect,
  TRadio,
  TCheckbox,
  TButton,
  TInputGroup,
  TCard,
  TAlert,
  TModal,
  TDropdown,
  TRichSelect,
  TPagination,
  TTag,
  TRadioGroup,
  TCheckboxGroup,
  TTable,
  TDatepicker,
  TToggle,
  TDialog,
} from 'vue-tailwind/dist/components';
const components = {
  TSelect
}
Vue.use(VueTailwind, components)


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

// index.js or main.js


