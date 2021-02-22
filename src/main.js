import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import configureFabric from './js/fabric/configuration'

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

configureFabric();
