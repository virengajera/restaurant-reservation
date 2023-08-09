<template>
  <div class="grid__item">
    <div class="card">
      <img
        class="card__img"
        :src="imageLink"
        alt="Snowy Mountains"
      />
      <div class="card__content">
        <h1 class="card__header">{{ name }}</h1>
        <p class="card__text">{{ description }} </p>
        <a :href="restaurantLink"><button class="card__btn">Explore</button></a>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "vue";

export default {
  props: ["restaurantId", "name", "description","image1"],
  setup(props) {
    const restaurantLink = computed(function () {
      return "/restaurant/" + props.restaurantId;
    });

    const imageLink = computed(function(){
      return "http://localhost:3001/image/restaurant/" + props.restaurantId + "/" + props.image1
    })

    return {
      restaurantLink,
      imageLink
    };
  },
};
</script>
<style scoped>
.grid__item {
  background-color: #fff;
  border-radius: 0.4rem;
  overflow: hidden;
  box-shadow: 0 3rem 6rem rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: 0.2s;
}
.grid__item:hover {
  transform: translateY(-0.5%);
  box-shadow: 0 4rem 8rem rgba(0, 0, 0, 0.2);
}

.card__img {
  display: block;
  width: 100%;
  height: 18rem;
  object-fit: cover;
}
.card__content {
  padding: 1.5rem 1.5rem;
}
.card__header {
  font-weight: 500;
  color: #0d0d0d;
  margin-bottom: 1rem;
}
.card__text {
  font-size: 1rem;
  letter-spacing: 0.1rem;
  line-height: 1.7;
  color: #3d3d3d;
  margin-bottom: 2.5rem;
}
.card__btn {
  display: block;
  width: 100%;
  padding: 1rem;
  font-size: 1.5rem;
  text-align: center;
  color: #3363ff;
  background-color: #dee1ea;
  border: none;
  border-radius: 0.4rem;
  transition: 0.2s;
  cursor: pointer;
}

.card__btn a {
  text-decoration: none;
  color: black;
}
.card__btn span {
  margin-left: 1rem;
  transition: 0.2s;
}
.card__btn:hover,
.card__btn:active {
  background-color: #00ffae;
  
}
.card__btn:hover span,
.card__btn:active span {
  margin-left: 1.5rem;
}
</style>