<template>
  <div>
    <the-header></the-header>
    <base-layout :navLinks="navLinks">
      <div class="restaurant-list" v-if="restaurants.length > 0">
        <restaurant-item
          v-for="restaurant in restaurants"
          :key="restaurant.name"
          :restaurant="restaurant"
          @showFullRestaurantDetail="showRestaurantModal(restaurant.id)"
        ></restaurant-item>
      </div>
      <div v-else>No Restaurants</div>
    </base-layout>
    <restaurant-form
      :mode="mode"
      :restaurant="viewRestaurant"
      @close-modal="closeModal"
      v-if="toShowModal"
    ></restaurant-form>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import TheHeader from "@/components/layout/TheHeader";
import BaseLayout from "@/components/ui/BaseLayout";
import RestaurantItem from "@/components/ui/RestaurantItem";
import RestaurantForm from "@/components/ui/RestaurantForm";

export default {
  components: { TheHeader, BaseLayout, RestaurantItem, RestaurantForm },

  setup() {
    const store = useStore();
    const router = useRouter();

    const navLinks = ref([
      { to: "/admin/pending", name: "Pending" },
      { to: "/admin/approved", name: "Approved" },
      { to: "/admin/rejected", name: "Rejected" },
    ]);

    const restaurants = ref([]);
    const toShowModal = ref(false);
    const mode = ref(null);
    const viewRestaurant = ref({})

    if (!store.getters["auth/isAdmin"]) {
      router.replace("/");
    }

    onMounted(async function () {
      const url = "http://localhost:3001/admin/restaurant/pending";
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

    function showRestaurantModal(id) {
      const findRestaurant = restaurants.value.find((curr) => curr.id == id);
      if (findRestaurant) {
        viewRestaurant.value = findRestaurant;
      } else {
        viewRestaurant.value = null;
      }
      mode.value = "admin-pending";
      toShowModal.value = true;
    }

    function closeModal() {
      toShowModal.value = false;
    }

    return {
      navLinks,
      restaurants,
      toShowModal,
      showRestaurantModal,
      closeModal,
      viewRestaurant,
      mode
    };
  },
};
</script>

<style scoped>
.restaurant-list {
  margin: 1rem 0;
}
</style>