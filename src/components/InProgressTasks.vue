<template>
  <div class="inprogress-widget">
    <div class="inprogress-widget__content">
      <h2 class="inprogress-widget__title">Текущие задачи: </h2>
      <div class="inprogress-widget__list" v-if="this.getInprogressTasks().length > 0">
        <div class="inprogress-widget__task task" v-for="task in this.getInprogressTasks()" :key="task.id">
          <div class="task__text">
            <h3 class="task__title" v-text="task.title"></h3>
            <p class="task__description" v-text="task.description.length > 70 ? task.description.slice(0, 70) + '...' : task.description.slice(0, 70)"></p>
            <p class="task__deadline" v-text="task.deadline"></p>
          </div>
          <div class="task__choice">
            <div class="task__done" @click="doneTask(task.id)"></div>
            <div class="task__edit" @click="showModal(task)"></div>
            <div class="task__delete" @click="deleteTask(task.id)"></div>
          </div>
        </div>
      </div>
      <div class="inprogress-widget__empty_list" v-else>
        <p class="task__title">Список задачи пусть</p>
      </div>
    </div>
    <modal v-show="isModalVisible" :task="currentTask" @close="closeModal"/>
  </div>
</template>

<script>

import modal from "@/components/Modal.vue"
import { mapActions, mapGetters } from "vuex"
export default {
  name: 'InProgress',
  components: {
    modal
  },
  data() {
    return {
      edit: false,
      isModalVisible: false,
      currentTask: {}
    }
  },
  watch: {
    isModalVisible: function() {
      if(this.isModalVisible){
        document.documentElement.style.overflow = 'hidden'
        return
      }
      document.documentElement.style.overflow = 'auto'
    }
  },
  methods: {
    showModal(data) {
      this.isModalVisible = true;
      this.currentTask = data
    },
    closeModal() {
      this.isModalVisible = false;
    },
    ...mapGetters({
      getInprogressTasks: 'getInprogressTasks',
    }),
    ...mapActions({
      deleteTasksInProgress: 'deleteTasksInProgress',
      inProgressToDone: 'inProgressToDone'
    }),
    deleteTask(id) {
      this.deleteTasksInProgress(id)
    },
    doneTask(id) {
      this.inProgressToDone(id)
    }
  }
}
</script>

<style lang="scss" scoped>
.inprogress-widget {
  background-color: white;
  width: 450px;
  border-radius: 14px;
  border: 2px solid #2D2739;

  &__content {
    padding: 20px 25px;
    width: 100%;
    height: 100%;
  }
  &__title {
    font-size: 1.5em;
    font-weight: 500;
    line-height: 1em;
    color: black;
    margin-bottom: 1em;
  } 
  &__list {
    width: 100%;
    height: 445px;
    overflow: auto;
  }
  &__empty_list {
    width: 100%;
    height: 445px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5em;
  }
}
.task {
  padding: 10px 15px;
  background-color: rgb(243, 243, 243);
  border-radius: 6px;
  margin-bottom: 1em;
  position: relative;
  border: 2px solid #2D2739;

  &:last-child {
    margin-bottom: 0;
  }
  &__title {
    font-size: 1em;
    line-height: 1em;
    color: black;
    margin-bottom: 1em;
  }

  &__text {
    width: calc(100% - 50px);
    height: 100%;
  }
  &__description {
    font-size: .9em;
    line-height: 1em;
    color: rgba(0, 0, 0, 0.767);
    margin-bottom: .5em;
  }
  &__deadline {
    font-size: .9em;
    line-height: 1em;
    color: rgba(0, 0, 0, 0.767);
    margin-bottom: 0;
  }
  &__choice {
    position: absolute;
    right: -1px;
    top: 0;
    height: calc(100% + 1px);
    width: 40px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  &__done {
    height: 33.333%;
    width: 100%;
    background-color: #52C41A;
    border-top-right-radius: 4px;
    position: relative;
    cursor: pointer;

    &::after, &::before {
      content: "";
      position: absolute;
      top: 50%;
      margin-bottom: -10px;
      right: 50%;
      margin-right: -10px;
      width: 20px;
      height: 2px;
      background-color: white;
    }
    &::after {
      transform: rotate(90deg);
    }
    &::before {
      transform: rotate(0deg);
    }
  }
  &__edit {
    height: 33.333%;
    width: 100%;
    background-color: #FAAD14;
    position: relative;
    cursor: pointer;

    &::after, &::before {
      content: "";
      position: absolute;
      top: 50%;
      margin-bottom: -10px;
      right: 50%;
      margin-right: -10px;
      width: 20px;
      height: 2px;
      background-color: white;
      transform: rotate(-35deg);
    }
    &::after {
      top: calc(50% + 1px);
    }
  }
  &__delete {
    height: 33.333%;
    width: 100%;
    background-color: #FF4D4F;
    border-bottom-right-radius: 4px;
    position: relative;
    cursor: pointer;

    &::after, &::before {
      content: "";
      position: absolute;
      top: 50%;
      margin-bottom: -10px;
      right: 50%;
      margin-right: -10px;
      width: 20px;
      height: 2px;
      background-color: white;
    }
    &::after {
      transform: rotate(45deg);
    }
    &::before {
      transform: rotate(-45deg);
    }
  }
}
@media (max-width: 992px) {
  .inprogress-widget {
    margin-bottom: 1.5em;
  }
}
@media (max-width: 500px) {
  .inprogress-widget {
    width: 100%;
  }
  .inprogress-widget__content {
    padding: 10px 15px;
  }
}
</style>
