<template>
  <div class="login-form">
    <the-header></the-header>
    <div class="form-container">
      <h2>Login</h2>
      <form action="" autocomplete="off" @submit.prevent="loginUser">
        <div>
          <label for="">E-mail</label>
          <input type="email" required ref="email" />
        </div>

        <div>
          <label for="">Password</label>
          <input type="password" required ref="password" />
        </div>

        <div>
          <label for="">Select User Type</label>
          <select name="usertype" id="" required ref="user">
            <option value="customer" default>Customer</option>
            <option value="restaurantowner">Restaurant Owner</option>
            <option value="waiter">Waiter</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit">Login</button>
      </form>
      <div class="info">
        <p>{{info}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

import TheHeader from "@/components/layout/TheHeader.vue";

export default {
  components: { TheHeader },
  setup(props,context) {
    const email = ref(null);
    const password = ref(null);
    const user = ref(null);
    const info = ref("");
    const store = useStore()
    const router = useRouter()


    if(store.getters['auth/isLogged']){
      router.replace('/')
    }

    async function loginUser() {
      try {
        const formData = {
          email: email.value.value,
          password: password.value.value,
          user: user.value.value,
        };

        await store.dispatch('auth/login', {formData})
        if(user.value.value == "customer"){
          router.push('/')

        }
        else if(user.value.value == "admin"){
          router.push("/admin/pending")
        }
        else{
          router.push("/restaurant-owner/restaurant")
        }
        
        info.value = data.msg
      } catch (error) { 
        info.value = "Error Occured"
        setTimeout(function(){
          info.value = ""
        },5000)
      }
    }


    return {
      email,
      password,
      user,
      loginUser,
      info
    };
  },
};
</script>


<style scoped>
.login-form {
  height: 100vh;
  width: 100vw;
  position: relative;
}

.login-form .form-container {
  width: 25vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.form-container div {
  margin: 1rem 0;
}
.form-container label {
  margin-bottom: 10px;
  display: block;
}

input {
  font-size: 16px;
  line-height: 28px;
  padding: 8px 16px;
  width: 100%;

  min-height: 44px;
  border: unset;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(60, 66, 87, 0.16) 0px 0px 0px 1px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px;
}

button {
  border: none;
  padding: 1rem 2rem;
  border-radius: 5px;
  font-size: 0.8rem;
  background-color: rgb(169, 238, 205);
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.12) 0px 1px 1px 0px, rgb(84, 105, 212) 0px 0px 0px 1px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(60, 66, 87, 0.08) 0px 2px 5px 0px;
  color: #0d0d0d;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background-color: rgb(0, 0, 0);
  color: wheat;
}
select {
  width: 100%;
  padding: 1rem 0;
  border-radius: 5px;
}
.info {
  background-color: #eb7870;
  color: white;
}
</style>
     