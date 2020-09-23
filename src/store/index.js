import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    inProgress: [
      {
        id: 1,
        title: 'Приготовить покушать',
        description: 'Используя рецепты на сайте cookbook.ru',
        deadline: '2020-09-24'
      }
    ],
    done: [
      {
        id: 1,
        title: 'Сделать домашнее задание',
        description: 'Используя рецепты на сайте cookbook.ru',
        deadline: '2020-09-24'
      }
    ],
  },
  getters: {
    getDoneTasks: state => state.done,
    getInprogressTasks: state => state.inProgress,
  },
  mutations: {
    addTasks(state, data){
      state.inProgress.push(data)
    },
    deleteTasksInProgress(state, data){
      let index = state.inProgress.findIndex(task => task.id === data)
      state.inProgress.splice(index, 1)
    },
    deleteTasksDone(state, data){
      let index = state.inProgress.findIndex(task => task.id === data)
      state.done.splice(index, 1)
    },
    inProgressToDone(state, data){
      let task = state.inProgress.find(task => task.id === data)
      let index = state.inProgress.findIndex(task => task.id === data)
      state.inProgress.splice(index, 1)
      task.id = state.done.length + 1
      state.done.push(task)
    },
    editTasks(state, data){
      console.log('mutation', data);
      let index = state.inProgress.findIndex(task => task.id === data.id)
      state.inProgress[index] = data
      console.log('inProgress', state.inProgress)
    },
  },
  actions: {
    addTasks({commit}, data){
      commit('addTasks', data)
    },
    deleteTasksInProgress({commit}, id){
      console.log('action');
      commit('deleteTasksInProgress', id)
    },
    deleteTasksDone({commit}, id){
      commit('deleteTasksDone', id)
    },
    inProgressToDone({commit}, id){
      console.log('action');
      commit('inProgressToDone', id)
    },
    editTasks({commit}, data){
      commit('editTasks', data)
    },
  },
  modules: {
  }
})
