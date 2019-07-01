import {
  login as loginApi,
  registerUser as registerUserApi,
  getUserObjLocalStorage as getUserObjLocalStorageApi,
  setUserObjLocalStorage as setUserObjLocalStorageApi,
  deleteUserObjLocalStorage as deleteUserObjLocalStorageApi,
  getUserIdByEmail as getUserIdByEmailApi,
} from '@/utils/api/auth';


export default {
  state: {
    user: (getUserObjLocalStorageApi()) ? getUserObjLocalStorageApi() : null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    async registerUser({ commit }, { email, password }) {
      commit('clearError');
      commit('setLoading', true);
      try {
        const accessToken = await registerUserApi(email, password);
        const userId = await getUserIdByEmailApi(email, accessToken);
        const userInfo = { email, id: userId, accessToken };
        await setUserObjLocalStorageApi(userInfo);
        commit('setUser', userInfo);
        commit('setLoading', false);
      } catch (error) {
        commit('setLoading', false);
        commit('setError', error.request.responseText);
        throw error;
      }
    },

    async loginUser({ commit, dispatch }, { email, password }) {
      commit('clearError');
      commit('setLoading', true);
      try {
        const accessToken = await loginApi(email, password);
        const userId = await getUserIdByEmailApi(email, accessToken);
        const userInfo = { email, id: userId, accessToken };
        await setUserObjLocalStorageApi(userInfo);
        commit('setUser', userInfo);

        dispatch('fetchData');

        commit('setLoading', false);
      } catch (error) {
        commit('setLoading', false);
        commit('setError', error);
        throw error;
      }
    },

    logoutUser({ commit }) {
      deleteUserObjLocalStorageApi();
      commit('setUser', {});
    },

  },
  getters: {
    user(state) {
      if (!state.user) return null;
      return state.user;
    },

    userId(state) {
      if (!state.user) return null;
      return (state.user.id) ? state.user.id : null;
    },

    accessToken(state) {
      if (!state.user) return null;
      return (state.user.accessToken)
        ? state.user.accessToken
        : null;
    },

    isUserLoggedIn(state, getters) {
      if (!state.user) return null;
      return !!((getters.user && getters.user.accessToken));
    },


  },
};
