import {
  createTask as createTaskApi,
  updateTask as updateTaskApi,
  deleteTask as deleteTaskApi,
  fetchTasks as fetchTasksApi,
  fetchStatusesTasks as fetchStatusesTasksApi,
} from '@/utils/api/tasks';

import _ from 'lodash';

export default {
  state: {
    tasks: [],
    tasksStatuses: [],
    doneStatusId: 2,
  },
  mutations: {
    loadTasks(state, payload) {
      state.tasks = payload;
    },
    loadTasksStatuses(state, payload) {
      state.tasksStatuses = payload;
    },
  },
  actions: {

    fetchData({ dispatch }) {
      dispatch('fetchTasks');
      dispatch('fetchStatusesTasks');
    },

    anyChangeHandlerTask({ getters }, task) {
      const taskObj = Object.assign({}, task);
      if (taskObj.statusId === getters.doneStatusId) {
        taskObj.doneDate = new Date().toISOString().substr(0, 10);
      } else {
        taskObj.doneDate = '';
      }
      return taskObj;
    },

    async fetchTasks({ commit, rootGetters, dispatch }) {
      commit('clearError');
      commit('setLoading', true);
      try {
        const userId = rootGetters.userId;

        await fetchTasksApi()
          .then(allTasks =>
            allTasks.filter(task => task.userId === userId),
          ).then((responseUserTasks) => {
            commit('loadTasks', responseUserTasks);
          });

        commit('setLoading', false);
      } catch (error) {
        dispatch('logoutUser');
        commit('setLoading', false);
        commit('setError', error);
        throw error;
      }
    },

    async fetchStatusesTasks({ commit }) {
      commit('clearError');
      commit('setLoading', true);
      try {
        await fetchStatusesTasksApi()
          .then((statuses) => {
            commit('loadTasksStatuses', statuses);
          }).then(() => {
            commit('setLoading', false);
          });
      } catch (error) {
        commit('setLoading', false);
        commit('setError', error);
        throw error;
      }
    },

    async createTask({ commit, dispatch }, payload) {
      try {
        const taskHandled = await dispatch('anyChangeHandlerTask', payload);
        await createTaskApi(taskHandled);
        dispatch('fetchTasks');
      } catch (error) {
        commit('setError', error.message);
        commit('setLoading', false);
        throw error;
      }
    },

    async deleteTask({ commit, dispatch }, payload) {
      try {
        await deleteTaskApi(payload);
        dispatch('fetchTasks');
      } catch (error) {
        commit('setError', error.message);
        commit('setLoading', false);
        throw error;
      }
    },


    async updateTask({ commit, dispatch }, payload) {
      commit('clearError');
      try {
        const taskHandled = await dispatch('anyChangeHandlerTask', payload);
        await updateTaskApi(taskHandled);
        dispatch('fetchTasks');
      } catch (error) {
        commit('setError', error.message);
        commit('setLoading', false);
        throw error;
      }
    },

  },
  getters: {
    tasks(state) {
      return state.tasks;
    },
    taskById: (state, getters) => (taskId) => {
      if (!getters.tasks) { return null; }
      return getters.tasks.find(task => ((task.id === taskId) ? Object.assign({}, task) : false));
    },

    tasksStatuses(state) {
      if (!state.tasksStatuses) { return null; }
      return state.tasksStatuses.map(taskGroup => Object.assign({}, taskGroup));
    },

    statusByKey: (state, getters) => (statusKey) => {
      if (!getters.tasksStatuses) { return null; }
      return getters.tasksStatuses.find(item => item.key === statusKey);
    },

    tasksWithStatusData(state, getters) {
      if (!getters.tasks || !getters.tasksStatuses) {
        return null;
      }
      return getters.tasks.map((task) => {
        const taskObj = Object.assign({}, task);
        const statusData = getters.tasksStatuses.find(
          status => ((status.id === taskObj.statusId)
            ? status
            : false
          ));
        if (typeof statusData !== 'undefined' && statusData.title && statusData.key) {
          return {
            ...taskObj,
            statusTitle: statusData.title,
            statusKey: statusData.key,
          };
        }
        return false;
      });
    },
    tasksGroupByStatuses(state, getters) {
      const tasks = Object.assign([], getters.tasks);
      const tasksStatuses = Object.assign([], getters.tasksStatuses);
      if (
        !tasks
        || !tasksStatuses
        || tasks.length < 1
        || tasksStatuses.length < 1
      ) {
        return null;
      }

      const tasksGroupByStatusesIter = (tasksArr, tasksStatusesArr) => {
        const iter = (maxCounter, counterKey, acc) => {
          if (maxCounter === counterKey) {
            return _.reverse(Object.assign([], acc));
          }
          const keyTasksStatusesArr = counterKey;
          const accResult = acc;
          const tasksByStatusId = tasksArr.filter(
            task => (
              (task.statusId === tasksStatusesArr[keyTasksStatusesArr].id)
                ? task
                : false
            ),
          ).map(
            (task) => {
              const statusData = tasksStatusesArr[keyTasksStatusesArr];
              const taskObj = Object.assign({}, task);
              taskObj.color = statusData.color;
              taskObj.statusTitle = statusData.title;
              taskObj.statusId = statusData.id;
              taskObj.statusKey = statusData.key;
              return taskObj;
            });

          accResult[tasksStatusesArr[keyTasksStatusesArr].key] = (tasksByStatusId)
            ? _.orderBy(tasksByStatusId, 'priority', 'desc')
            : [];

          return iter(maxCounter, keyTasksStatusesArr + 1, accResult);
        };

        return iter(tasksStatusesArr.length, 0, []);
      };

      return tasksGroupByStatusesIter(tasks, tasksStatuses);
    },
    doneStatusId(state) {
      return state.doneStatusId;
    },

  },
};
