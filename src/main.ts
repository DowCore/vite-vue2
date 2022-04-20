import Vue from 'vue'
import { createApp, h } from 'vue-demi'
import VueCompositionApi from '@vue/composition-api'
import Element from 'element-ui'
import ColorPicker from 'vcolorpicker'
import './styles/index.scss'
import './styles/element-variables.scss'
import App from '@/App.vue'
import 'windi.css'
import router from '@/router'
Vue.use(ColorPicker)
Vue.use(VueCompositionApi)
Vue.use(Element, { size: 'mini', zIndex: 3000 })

Vue.config.productionTip = false
Vue.config.devtools = true

const app = createApp({
  router,
  render: () => h(App),
})

app.mount('#app')
