<template>
  <div class="header">
    <h2 class="logo"><router-link to="/"><img src="../../assets/logo.png" alt="" srcset=""></router-link></h2>
    <div class="nav">
      <button @click="goto('login')" v-if="!toShow">Login</button>
      <button @click="goto('register')" v-if="!toShow">Register</button>
      <button @click="goto('customer/reservation-detail')" v-if="isCustomer">View Reservation</button>
      <button @click="goto('restaurant-owner/restaurant')" v-if="isRestaurantOwner">View Profile</button>
      <button @click="goto('admin/pending')" v-if="isAdmin">Go to Dashboard</button>
      <button @click="logout" v-if="toShow">Logout</button>
    </div>
  </div>
</template>

<script>
import { ref,computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const toShow = ref(false);
    const user = ref(null)
    const isCustomer = ref(null)
    const isRestaurantOwner = ref(null)
    const isAdmin = ref(null)

    isCustomer.value = store.getters['auth/isCustomer']
    isRestaurantOwner.value = store.getters['auth/isRestaurantOwner']
    isAdmin.value = store.getters['auth/isAdmin']

    if (store.getters["auth/isLogged"]) {
      toShow.value = true;
    }

    function goto(where) {
      router.push("/" + where);
    }

    function logout(){
        store.dispatch('auth/logout')
        toShow.value = false;
        isCustomer.value = store.getters['auth/isCustomer']
        router.push('/')
    }

    return {
      goto,
      toShow,
      logout,
      isCustomer,
      isRestaurantOwner,
      isAdmin
    };
  },
};
</script>

<style scoped>
.header {
  min-height: 10vh;
  background-color: rgb(0, 255, 208);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header h2,
.header .nav {
  margin: 0rem 1rem;
}

.header .nav button {
  position: relative;
  display: inline-block;
  margin: 0rem 1rem;
  padding: 0.5rem 1rem;
  text-align: center;
  font-size: 1rem;
  text-decoration: none;
  color: #000000;
  cursor: pointer;
  transition: ease-out 0.5s;
  border: 2px solid #000000;
  border-radius: 10px;
}

.header .nav button:hover {
  color: black;
  box-shadow: inset 0 -100px 0 0 #00fb75;
}

.header .nav button:active {
  transform: scale(0.5);
}
</style>