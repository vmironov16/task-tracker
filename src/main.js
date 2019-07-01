// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import '@fortawesome/fontawesome-free/css/all.css';
import 'es6-promise/auto';


import Vue from 'vue';

import Vuetify from 'vuetify';

import Vuex from 'vuex';
import store from '@/store';


import VueLodash from 'vue-lodash';

import axios from 'axios';
import VueAxios from 'vue-axios';


import 'vuetify/dist/vuetify.min.css';


import App from './App';
import router from './router';

Vue.use(Vuetify, {
  iconfont: 'fa',
});
Vue.use(Vuex);
const options = { name: 'lodash' };
Vue.use(VueLodash, options);
Vue.use(VueAxios, axios);


Vue.use(require('vue-moment'));

Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
  created() {
    if (this.$store.getters.isUserLoggedIn) {
      this.$store.dispatch('fetchData');
    }
  },
});
