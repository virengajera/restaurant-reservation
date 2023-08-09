<template>
  <button class="base_btn">
    <slot></slot>
  </button>
</template>


<style scoped>
.base_btn {
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

.base_btn:hover {
  color: black;
  box-shadow: inset 0 -100px 0 0 #00fb75;
}

.base_btn:active {
  transform: scale(0.5);
}
</style>