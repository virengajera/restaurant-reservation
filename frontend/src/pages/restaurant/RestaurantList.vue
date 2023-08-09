<template>
  <div>
    <the-header></the-header>
    <search-bar @search-restaurant="searchRestaurant"></search-bar>
    <div class="grid" v-if="restaurants.length > 0">
      <restaurant-card
        v-for="restaurant in restaurants"
        :key="restaurant"
        :restaurantId="restaurant.id"
        :id="restaurant.name"
        :name="restaurant.name"
        :image1="restaurant.image1"
        :description="restaurant.description"
      ></restaurant-card>
    </div>
  </div>
</template>


<script>
import { ref, onMounted,provide } from "vue";
import RestaurantCard from "@/components/ui/RestaurantCard.vue";
import SearchBar from '@/components/ui/SearchBar.vue';
import TheHeader from "@/components/layout/TheHeader.vue";

export default {
  components: { RestaurantCard, TheHeader,SearchBar, },

  setup() {
    const restaurants = ref([]);
    const isLoading = ref(true);
    const isError = ref(false);

    onMounted(async function () {
      try {
        let req = await fetch(
          "http://localhost:3001/restaurant/searchrestaurant"
        );
        let restaurant = await req.json();
        isLoading.value = false;
        restaurants.value = restaurant;
      } catch (error) {
        isLoading.value = false;
        isError.value = true;
        console.error(error);

      }
    });


   async function searchRestaurant(name){

      try {
        let req = await fetch(
          "http://localhost:3001/restaurant/searchrestaurant?name=" + name
        );
        let restaurant = await req.json();
        isLoading.value = false;
        restaurants.value = restaurant;
      } catch (error) {
        isLoading.value = false;
        isError.value = true;
        console.error(error);
        provide("restaurants",restaurants)
      }
    }

    return { restaurants, isError, isLoading,searchRestaurant };
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-gap: 3rem;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: start;
  padding: 1rem;
}
</style>