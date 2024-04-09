import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import pdfMake from 'pdfmake'
import html2canvas from 'html2canvas'
import AMS from './pea_ams.js'
// import pdf from 'pdfvuer'

Vue.config.productionTip = false
Vue.use(AMS)

new Vue({
  html2canvas,
  pdfMake,
  // pdf,
  router,
  store,
  vuetify,
  icons: {
    iconfont: 'mdiSvg', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },
  render: h => h(App)
}).$mount('#app')
