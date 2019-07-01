export default {
  state: {
    loading: false,
    error: null,
    rulesLoginForm: {
      passwordLengthRule: 5,
    },
    tasksListOptions: {
      activeViewModeList: 'scrum',
      viewModeList: ['scrum', 'table'],
    },
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
    setActiveViewModeListForTasksListOption(state, payload) {
      state.tasksListOptions.activeViewModeList = payload;
    },
  },
  actions: {
    setLoading({ commit }, payload) {
      commit('setLoading', payload);
    },
    setError({ commit }, payload) {
      commit('setError', payload);
    },
    clearError({ commit }) {
      commit('clearError');
    },
    setActiveViewModeListForTasksListOption({ commit }, payload) {
      commit('setActiveViewModeListForTasksListOption', payload);
    },
  },
  getters: {
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
    passwordLengthRule(state) {
      return state.rulesLoginForm.passwordLengthRule;
    },
    tasksListOptions(state) {
      return state.tasksListOptions;
    },
  },
};
