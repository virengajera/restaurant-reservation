<template>
  <div class="restaurant-item">
    <h2>{{restaurant.name}}</h2>
    <common-button @click="showFullRestaurantDetail(restaurant.id)" mode="normal">View Full Details</common-button>
  </div>
</template>

<script>
import CommonButton from "@/components/ui/CommonButton"
export default {
  components : {CommonButton,},
  props : ['restaurant'],
  setup(props,context){
    function showFullRestaurantDetail(restaurantId){
      context.emit("showFullRestaurantDetail",restaurantId)
    }
    return {
      showFullRestaurantDetail,
    }
  }
}
</script>

<style scoped>
.restaurant-item {
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>