<template>
  <div class="searchbar">
    <form action="" @submit.prevent="search">
      <div>
        <input type="text" name="restaurantName" ref="restaurantName" />
      </div>
      <div>
        <base-button type="submit">Search</base-button>
      </div>
    </form>
  </div>
</template>

<script>
import BaseButton from "@/components/ui/BaseButton.vue";
import { ref, inject } from "vue";
export default {
  components: { BaseButton },

  setup(props, context) {
    const restaurantName = ref(null);

    function search() {
      if(restaurantName.value.value !== "" || restaurantName.value.value !== " "){
        context.emit("searchRestaurant", restaurantName.value.value);
      }
    }
    return {
      search,
      restaurantName,
    };
  },
};
</script>

<style scoped>
input {
  border: 1px solid black;
  background: hsl(0 0% 93%);
  border-radius: 0.25rem;
  padding: 0.75rem 1rem;
  width: 50vh;
}
.searchbar {
  margin: 1rem 0;
}
.searchbar form {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>