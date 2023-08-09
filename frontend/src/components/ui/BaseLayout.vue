<template>
  <div class="layout-container">
    <div class="layout-nav">
      <router-link
        v-for="navLink in navLinks"
        :to="navLink.to"
        :key="navLink.to"
      >
        {{ navLink.name }}
      </router-link>
    </div>
    <div class="layout-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["navLinks"],
};
</script>

<style scoped>
.layout-container {
  display: flex;
  height: 90vh;
}
.layout-container .layout-nav {
  display: flex;
  flex-direction: column;
  flex-basis: 20%;
}
.layout-container .layout-nav a {
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.266);
  border-radius: 0.25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  color: rgba(0, 0, 0, 0.85);
  cursor: pointer;
  font-family: system-ui, -apple-system, system-ui, "Helvetica Neue", Helvetica,
    Arial, sans-serif;
  font-weight: 600;
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  margin: 1rem;
  padding: 1rem 0;
  text-align: center;
}
.layout-container .layout-nav a:active,
.layout-container .layout-nav .router-link-active {
  background-color: #dededf;
  border-color: rgba(0, 0, 0, 0.936);
  box-shadow: rgba(0, 0, 0, 0.138) 0 2px 4px;
  color: rgb(0, 0, 0);
}
.layout-container .layout-nav a:hover {
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  color: rgba(0, 0, 0, 0.65);
}
.layout-container .layout-content {
  flex: 1;
  margin: 1rem;
}
</style>