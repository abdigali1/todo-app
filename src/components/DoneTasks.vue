<template>
  <div class="done-widget">
    <div class="done-widget__content">
      <h2 class="done-widget__title">Выполненные задачи: </h2>
      <div class="done-widget__list" v-if="this.getDoneTasks().length > 0">
        <div class="done-widget__task task" v-for="task in this.getDoneTasks()" :key="task.id">
          <div class="task__text">
            <h3 class="task__title" v-text="task.title"></h3>
            <p class="task__description" v-text="task.description.slice(0, 70)"></p>
            <p class="task__deadline" v-text="task.deadline"></p>
          </div>
          <div class="task__choice">
            <div class="task__delete" @click="deleteTask(task.id)"></div>
          </div>
        </div>
      </div>
      <div class="done-widget__empty_list" v-else>
        <p class="task__title">Список задачи пусть</p>
      </div>
    </div>
  </div>
</template>

<script>

import { mapActions, mapGetters } from "vuex"
export default {
  name: 'DoneTasks',
  data() {
    return {
      
    }
  },
  methods: {
    ...mapGetters({
      getDoneTasks: 'getDoneTasks',
    }),
    ...mapActions({
      deleteTasksDone: 'deleteTasksDone',
    }),
    deleteTask(id) {
      this.deleteTasksDone(id)
    }
  }
}
</script>

<style lang="scss" scoped>
.done-widget {
  background-color: white;
  width: 450px;
  border-radius: 14px;
  border: 2px solid #2D2739;

  &__content {
    padding: 20px 25px;
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
  text-decoration: line-through;

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
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }
  &__delete {
    height: 100%;
    width: 100%;
    background-color: #FF4D4F;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
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
@media (max-width: 500px) {
  .done-widget {
    width: 100%;
  }
  .done-widget__content {
    padding: 10px 15px;
  }
}
</style>
