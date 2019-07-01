import Vue from 'vue';
import Vuex from 'vuex';
import tasks from './modules/tasks';
import shared from './modules/shared';
import user from './modules/user';

/*
import orders from './orders'
*/

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    tasks,
    shared,
    user,
  },
});
