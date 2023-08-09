<template>
  <button :type="type" :class="mode">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ["type", "mode"],
};
</script>
<style scoped>
button {
  border-radius: 0.25rem;
  font-weight: 600;
  text-decoration: none;
  padding: 1rem 2rem;
  text-align: center;
  cursor: pointer;
}
.normal {
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  color: rgba(0, 0, 0, 0.85);
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.266);
}

.normal:hover {
  background-color: #dededf;
  border-color: rgba(0, 0, 0, 0.936);
  box-shadow: rgba(0, 0, 0, 0.138) 0 2px 4px;
  color: rgb(0, 0, 0);
}

.add {
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  color: rgba(0, 0, 0, 0.85);
  background-color: #0ab0e3;
  border: 1px solid rgba(0, 0, 0, 0.266);
}

.add:hover {
  background-color: #dededf;
  border-color: rgba(0, 0, 0, 0.936);
  box-shadow: rgba(0, 0, 0, 0.138) 0 2px 4px;
  color: rgb(0, 0, 0);
}



.close {
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  color: white;
  background-color: rgb(255, 0, 0);
  border: 1px solid rgba(0, 0, 0, 0.266);
}

.close:hover {
  background-color: black;
  box-shadow: rgba(0, 0, 0, 0.138) 0 2px 4px;
  color: rgb(247, 199, 199);
}

.reset {
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  color: rgb(0, 0, 0);
  background-color: rgb(136, 255, 0);
  border: 1px solid rgba(0, 0, 0, 0.266);
}
.reset:hover {
  background-color: rgb(0, 248, 103);
  box-shadow: rgba(0, 0, 0, 0.138) 0 2px 4px;
  color: rgb(0, 0, 0);
}

.edit {
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  color: rgb(255, 255, 255);
  background-color: rgb(69, 83, 53);
  border: 1px solid rgba(0, 0, 0, 0.266);
}
.edit:hover {
  background-color: rgb(0, 0, 0);
  box-shadow: rgba(0, 0, 0, 0.138) 0 2px 4px;
  color: rgb(255, 255, 255);
}

.update {
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  color: rgb(0, 0, 0);
  background-color: rgb(1, 205, 201);
  border: 1px solid rgba(0, 0, 0, 0.266);
}
.update:hover {
  background-color: rgb(3, 149, 146);;
  box-shadow: rgba(0, 0, 0, 0.138) 0 2px 4px;
  color: rgb(0, 0, 0);
}
</style>