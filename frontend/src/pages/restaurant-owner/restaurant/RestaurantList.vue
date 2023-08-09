<template>
  <div>
    <the-header></the-header>
    <base-layout :navLinks="navLinks">
      <common-button @click="addRestaurantModal" mode="normal">Add New Restaurant</common-button >
      <div class="restaurant-list" v-if="restaurants.length > 0">
        <restaurant-item
          v-for="restaurant in restaurants"
          :key="restaurant.name"
          :restaurant="restaurant"
          @showFullRestaurantDetail="showRestaurantModal(restaurant.id)"
        ></restaurant-item>
      </div>
    </base-layout>
    <restaurant-form
      :mode="mode"
      :restaurant="viewRestaurant"
      @close-modal="closeModal"
      @change-mode="changeMode"
      v-if="toShowModal"
    ></restaurant-form>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import TheHeader from "@/components/layout/TheHeader";

import RestaurantItem from "@/components/ui/RestaurantItem";
import BaseLayout from "@/components/ui/BaseLayout";
import CommonButton from "@/components/ui/CommonButton";
import RestaurantForm from "@/components/ui/RestaurantForm";

export default {
  components: {
    TheHeader,
    BaseLayout,
    CommonButton,
    RestaurantItem,
    RestaurantForm,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const toShowModal = ref(false);
    const restaurants = ref([]);
    const viewRestaurant = ref(null)
    const mode = ref(null);

    /* 
      { to: "/restaurant-owner/waiter", name: "My Waiters" },
      { to: "/restaurant-owner/message", name: "Messages" }, */

    const navLinks = ref([
      { to: "/restaurant-owner/restaurant", name: "My Restaurant" }
    ]);

    if (!store.getters["auth/isRestaurantOwner"]) {
      router.push("/login");
    }

    onMounted(async function () {
      const url = "http://localhost:3001/restaurantowner/viewrestaurant";
      const token = store.getters["auth/getUser"].token;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "x-access-token": token,
        },
      });
      const responseData = await response.json();
      if (response.ok) {
        restaurants.value = responseData;
      }
    });

    function closeModal() {
      toShowModal.value = false;
      mode.value = null;
      viewRestaurant.value = null
    }

    function addRestaurantModal() {
      toShowModal.value = true;
      mode.value = "add";
    }

    function showRestaurantModal(id) {
      console.log("View Full Restuarnt Detail", id);
      const findRestaurant = restaurants.value.find((curr)=>curr.id == id)
      if(findRestaurant){
        viewRestaurant.value = findRestaurant
      }
      else {
        viewRestaurant.value = null
      }
      mode.value = "view";
      toShowModal.value = true;
    }

    function changeMode(newMode){
      console.log("mode",newMode)
      mode.value = newMode
    }

    return {
      restaurants,
      navLinks,
      toShowModal,
      closeModal,
      addRestaurantModal,
      showRestaurantModal,
      mode,
      changeMode,
      viewRestaurant
    };
  },
};
</script>

<style scoped>
.restaurant-list {
  margin: 1rem 0;
}
</style>