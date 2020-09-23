<template>
  <div class="wrapper">
    <header class="wrapper__header header">
      <nav class="header__menu menu">
        <div class="menu__container container">
          <div class="menu__body">
            <div class="menu__menu" :class="{ 'active' : activeBtn }">
              <ul class="menu__list">
                <li>
                  <a href="#" class="menu__link">Main</a>
                </li>
                <li>
                  <a href="#" class="menu__link">About us</a>
                </li>
                <li>
                  <a href="#" class="menu__link">Contacts</a>
                </li>
              </ul>
            </div>
            <div class="menu__burger" :class="{ 'active' : activeBtn }" @click="toggleBurger()">
              <span></span>
            </div>
            <div class="menu__authorization">
              <ul class="menu__auth-list">
                <li>
                  <div class="menu__dropdown dropdown">
                    <button class="dropdown__dropdown-btn">Authorization<span class="dropdown__sign"></span></button>
                    <div class="dropdown__content">
                      <a class="dropdown__link" href="#">Sign In</a>
                      <a class="dropdown__link" href="#">Sign Up</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div class="header__container container">
        <img class="header__bg-image" src="../assets/img/bg.jpg" alt="">
      </div>
    </header>
    <main class="wrapper__main main">
      <div class="main__container container">
        <div class="main__content">
          <div class="main__row row">
            <div class="main__column col">



              <div class="main__widgets">
                <InProgressTasks class="main__inprogress" />
                <DoneTasks />
              </div>
              

              <div class="main__create-block create-block">
                <div class="create-block__content">
                  <h3 class="create-block__title">Создать новую задачу</h3>
                  <div class="create-block__form">
                    <div class="create-block__inputs">
                      <input v-model="form.title" :class="{ 'error-btn' : error }" type="text" placeholder="Заголовок" class="create-block__input">
                      <input v-model="form.deadline" :class="{ 'error-btn' : error }" type="date" class="create-block__input">
                    </div>
                    <textarea v-model="form.description" :class="{ 'error-btn' : error }" class="create-block__textarea" placeholder="Описание" rows="3" cols="30"></textarea>
                    <button @click.prevent="createTask()" class="create-block__submit-btn">Создать</button>
                    <div v-if="error" class="create-block__error-text">Заполните все поля!</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <footer class="wrapper__footer footer">
      <div class="footer__container container">
        <div class="footer__content">
          <div class="footer__row row">
            <div class="footer__column col">
              <div class="footer__text">
                <h2 class="footer__title">Main</h2>
                <p class="footer__Wsubtitle">Boss Media Group</p>
                <p class="footer__subtitle">Учет.kz</p>
              </div>
            </div>
            <div class="footer__column col">
              <div class="footer__text">
                <h2 class="footer__title">About us</h2>
                <p class="footer__subtitle">Учет.kz</p>
                <p class="footer__subtitle">Boss Media Group</p>
              </div>
            </div>
            <div class="footer__column col">
              <div class="footer__text">
                <h2 class="footer__title">Contacts</h2>
                <p class="footer__subtitle">8(777)777-77-77</p>
                <p class="footer__subtitle">г. Алматы, ул. Звезда</p>
              </div>
            </div>
            <div class="footer__column col">
              <div class="footer__text">
                <h2 class="footer__title">Socials</h2>
                <div class="footer__socials">
                  <a href="#" class="footer__link"><img class="footer__social" src="@/assets/img/facebook.png" alt="facebook"></a>
                  <a href="#" class="footer__link"><img class="footer__social" src="@/assets/img/instagram.png" alt="instagram"></a>
                  <a href="#" class="footer__link"><img class="footer__social" src="@/assets/img/twitter.png" alt="twitter"></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>

import { mapActions, mapGetters } from "vuex"
import DoneTasks from "@/components/DoneTasks.vue";
import InProgressTasks from "@/components/InProgressTasks.vue";
export default {
  name: 'Home',
  components: {
    DoneTasks,
    InProgressTasks
  },
  data() {
    return {
      activeBtn: false,
      form: {
        title: '',
        deadline: '',
        description: ''
      },
      error: false
    }
  },
  mounted: function() {
    if(this.activeBtn){
      document.body.toggleClass('lock')
    }
  },
  watch: {
    activeBtn: function() {
      if(this.activeBtn){
        document.documentElement.style.overflow = 'hidden'
        return
      }
      document.documentElement.style.overflow = 'auto'
    }
  },
  methods: {
    ...mapActions({
      addTasks: 'addTasks',
    }),
    ...mapGetters({
      getInprogressTasks: 'getInprogressTasks',
    }),
    toggleBurger() {
      this.activeBtn = !this.activeBtn
    },
    createTask() {
      if(this.form.title && this.form.deadline && this.form.description){
        this.form.id = (this.$store.state.inProgress.length + 1)
        this.addTasks({
          id: this.form.id,
          title: this.form.title,
          description: this.form.description,
          deadline: this.form.deadline
        })

        this.form.title = ''
        this.form.description = ''
        this.form.deadline = ''
      } else {
        this.error = true
        setTimeout(()=> this.error = false, 5000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}
.wrapper {
  &__header {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: white;
  }
  &__main {
    width: 100%;
    background-color: white;
  }
  &__footer {
    width: 100%;
    background-color: #2D2739;
  }
}
.header {
  
  &__bg-image {
    width: 100%;
    height: 100vh;
    object-fit: cover;
  }
}

.main {


  &__content {
    width: 100%;
    height: 100%;
    background-color: #FBD8D4;
    padding: 2em 2em;
  }
  &__widgets {
    display: flex;
    margin-bottom: 2em;
    justify-content: space-between;
  }

  @media (max-width: 992px) {
    &__widgets {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
}
.error-btn {
  border-color: #D32F2F !important;
}
.create-block {
  background-color: white;
  border-radius: 14px;
  width: 90%;
  margin: 0 auto;
  border: 2px solid #2D2739;

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
    padding: 30px 35px;
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
.footer {


  &__content {
    width: 100%;
    color: #FBD8D4;
    padding: 2em 1em;
  }
  &__row {

  }
  &__column {
    display: flex;
    flex-direction: column;
    align-items: center;

    // &:nth-child(1) {
    //   align-items: flex-start;  
    // }
    // &:nth-child(3) {
    //   align-items: flex-end;  
    // }
  }
  &__title {
    font-size: 1.2em;
    font-weight: 600;
    margin-bottom: 1em;
  } 
  &__text {
    text-align: left;
  }
  &__socials {
    display: flex;
  }
  &__link {
    width: 30px;
    height: 30px;
    margin-right: 1em;

    &:last-child {
      margin-right: 0;
    }
  }
  &__social {
    width: 100%;
    height: 100%;
  }
  &__subtitle {
    font-size: 1em;
    font-weight: 500;
    margin-bottom: .6em;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  @media (max-width: 992px) {

    &__row {
      display: flex;
      flex-direction: column;
    }
    &__column {
      margin-bottom: 2em;

      &:last-child {
        margin-bottom: 0;
      }
      &:last-child::after {
        display: none;
      }
      &::after {
        content: "";
        position: absolute;
        bottom: -20px;
        left: 50%;
        margin-left: -75px;
        width: 150px;
        height: 2px;
        background-color: #FBD8D4;
      }
    }
    &__text {
      text-align: center;
    }
  }
}
.container {
  max-width: 1180px;
  margin: 0 auto;
  height: 100%;
}
.menu {
  width: 100%;
  height: 90px;
  background-color: #2D2739;
  z-index: 2;
  position: fixed;

  &__body {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__list, &__auth-list {
    display: flex;
    margin-bottom: 0;
  }
  &__auth-list {
    display: flex;
  }
  &__link {
    text-decoration: none;
    color: #FBD8D4;
    font-weight: 500;
    font-size: 1em;
    line-height: 22px;
  }
  &__list li {
    margin: 0 0 0 20px;
    list-style: none;
  }
  &__auth-list li {
    margin: 0 20px 0 0;
    list-style: none;
  }
  &__logo {
    height: 80%;
    flex: 0 0 60px;
    position: relative;
    z-index: 3;
  }
  &__logo img {
    max-width: 100%;
  }
  @media (max-width: 992px) {
    body.lock {
      overflow: hidden;
    }
    &__body {
      padding: 15px 20px;
    }
    &__burger {
      display: block;
      width: 50px;
      height: 50px;
      position: relative;
      z-index: 3;
    }
    &__burger span, &__burger span::after, &__burger span::before {
      position: absolute;
      top: 50%; margin-top: -1px;
      left: 50%; margin-left: -15px;
      width: 30px;
      height: 2px;
      background-color: #FBD8D4;
    }
    &__burger span::after, &__burger span::before {
      content: "";
      display: block;
      transition: 0.5s;
    }
    &__burger span::after {
      transform: translateY(10px);
    }
    &__burger span::before {
      transform: translateY(-10px);
    }
    &__burger.active span::after {
      transform: rotate(45deg);
    }
    &__burger.active span {
      height: 0;
    }
    &__burger.active span::before {
      transform: rotate(-45deg);
    }
    &__menu {
      position: fixed;
      top: -120%;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #2D2739;
      padding: 100px 10px 20px 10px;
      transition: 0.5s;
      overflow: auto;
    }
    &__menu.active {
      top: 0;
      transition: 0.5s;
    }
    &__list {
      display: block;
    }
    &__list li {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 0 20px 0;
    }
  }
}
.dropdown {
  position: relative;
  display: inline-block;

  &__dropdown-btn {
    color: #FBD8D4;
    background-color: #686FA3;
    font-weight: 500;
    font-size: 1em;
    padding: 5px 40px 5px 10px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    outline: none;
    transition: 0.2s ease;
    position: relative;
  }
  &__sign {
    position: absolute;
    right: 10px;
    top: calc(50% - 2px);
    width: 0; 
    height: 0; 
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #FBD8D4;
    transition: .1s ease;
  }
  &__content {
    position: absolute;
    background-color: #686FA3;
    min-width: calc(100% - 6px);
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    transform: translateY(20px);
    opacity: 0;
    transition: 0.3s ease all;
  }
  &__link {
    color: #FBD8D4;
    text-align: center;
    padding: 5px 10px;
    text-decoration: none;
    display: block;
    transition: .3s ease;

    &:last-child {
      border-bottom-right-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    &:hover {
      background-color: #5c6394
    }
  }
  &:hover &__content {
    opacity: 1;
    transform: translateX(3px);
    transition: 0.3s ease all;
  }
  &:hover &__sign {
    transition: .5s ease;
    transform: rotate(180deg);
  }
  &:hover &__dropdown-btn {
    opacity: 0.9;
  }
}
@media (max-width: 500px) {
  .main__content {
    padding: 1em 1em !important;
  }
  .create-block {
    width: 100% !important; 
  }
  .create-block__input, .create-block__textarea, .create-block__inputs {
    width: 100% !important;
  }
  .create-block__content {
    padding: 10px 15px !important;
  }
}
</style>
