<template>
  <transition name="modal">
    <div class="modal">
      <div class="modal__wrapper">
        <div class="modal__container">
          <div class="modal-body body">
            <slot name="body">
              <div class="create-block__content">
                <h3 class="create-block__title">Изменить задачу</h3>
                <div action="" class="create-block__form">
                  <div class="create-block__inputs">
                    <input v-model="form.title" :class="{ 'error-btn' : error }" type="text" placeholder="Заголовок" class="create-block__input">
                    <input v-model="form.deadline" :class="{ 'error-btn' : error }" type="date" class="create-block__input">
                  </div>
                  <textarea v-model="form.description" :class="{ 'error-btn' : error }" class="create-block__textarea" placeholder="Описание" rows="3" cols="30"></textarea>
                  <button @click.prevent="editTask()" class="create-block__submit-btn">Изменить</button>
                  <div v-if="error" class="create-block__error-text">Заполните все поля!</div>
                </div>
                <button class="create-block__close-btn" @click="close"><span class="modal__close"></span></button>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
export default {
  name: 'modal',
  props: ['task'],
  data () {
    return {
      form: {
        title: '',
        deadline: '',
        description: ''
      },
      error: false
    }
  },
  methods: {
    ...mapGetters({
      getInprogressTasks: 'getInprogressTasks',
    }),
    ...mapActions({
      editTasks: 'editTasks',
    }),
    show() {
      console.log(this.task);
    },
    close() {
      this.$emit('close');
    },
    editTask() {
      if(this.form.title && this.form.deadline && this.form.description){
        this.editTasks({
          id: this.task.id,
          title: this.form.title,
          description: this.form.description,
          deadline: this.form.deadline
        })

        this.form.title = ''
        this.form.description = ''
        this.form.deadline = ''
        this.close()
      } else {
        this.error = true
        setTimeout(()=> this.error = false, 5000)
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;

  &__wrapper {
    display: table-cell;
    vertical-align: middle;
  }
  &__container {
    width: 70%;
    margin: 0px auto;
    background-color: #fff;
    border-radius: 14px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }
}
.create-block {
  background-color: white;
  border-radius: 14px;
  width: 90%;
  margin: 0 auto;
  border: 2px solid #2D2739;
  position: relative;

  @media (max-width: 992px) {
    &__form {
      flex-direction: column;
      justify-content: center !important;
      align-items: center !important;
    }
    &__inputs {
      margin-bottom: .8em;
    }
    &__textarea {
      margin-bottom: .8em !important;
    } 
  }
  &__content {
    padding: 10px 15px;
  }
  &__title {
    font-size: 1.5em;
    font-weight: 500;
    line-height: 1em;
    color: #2D2739;
    margin-bottom: 1em;
  }
  &__form {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    position: relative;
  }
  &__inputs {
    margin-right: 1em;
  }
  &__line {
    width: 1px;
    height: 100px;
    background-color: #2D2739;
  }
  &__input, &__textarea {
    outline: none;
    border-radius: 8px;
    padding: 3px 5px;
    cursor: pointer;
    margin-bottom: .8em;
    width: 300px;
    border: 2px solid #2D2739;

    &:last-child {
      margin-bottom: 0;
    }
  }
  &__close-btn {
    border: 0;
    outline: none;
    background-color: transparent;
    position: absolute;
    top: 25px;
    right: 25px;
    width: 30px;
    height: 30px;

    &::after, &::before {
      content: "";
      position: absolute;
      top: 50%;
      margin-bottom: -10px;
      right: 50%;
      margin-right: -10px;
      width: 20px;
      height: 1px;
      background-color: black;
    }
    &::after {
      transform: rotate(45deg);
    }
    &::before {
      transform: rotate(-45deg);
    }
  }
  &__textarea {
    margin-bottom: 0;
    border: 2px solid #2D2739;
  } 
  &__submit-btn {
    outline: none;
    border: none;
    border-radius: 8px;
    padding: 10px 30px;
    cursor: pointer;
    width: 150px;
    background-color: #2D2739;
    color: white;
    margin-left: 1em;

    &:hover {
      opacity: .9;
      transform: scale(1.1);
    }
  }
  &__inputs {
    display: flex;
    flex-direction: column;
  }
  &__error-text {
    position: absolute;
    right: 0;
    top: 0;
    color: #D32F2F;
    font-size: 1rem;
  }
}
.error-btn {
  border-color: #D32F2F !important;
}
.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
@media (max-width: 900px) {
  .modal__container {
    width: 60%;
  }
}
</style>