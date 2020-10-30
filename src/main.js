import Vue from 'vue'
import VueCookies from 'vue-cookies'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

//Layouts
import Default from './layouts/default';
Vue.component('default-layout', Default);

import Nosidebar from './layouts/nobars';
Vue.component('no-sidebar-layout', Nosidebar);

import Content from './layouts/content';
Vue.component('content-layout', Content);

import editor from './components/editor';
Vue.component('editor', editor);

Vue.use(VueCookies);

Vue.prototype.$http = axios;
Vue.prototype.$user = [];
Vue.config.productionTip = false

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
export default app;
