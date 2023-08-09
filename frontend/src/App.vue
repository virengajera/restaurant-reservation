<template>
  <router-view></router-view>
</template>

<script>
import { onBeforeMount } from "vue";
import { useStore } from "vuex";

export default {
  created() {
    const store = useStore();
    store.dispatch("auth/tryLogin");
  },
  setup() {},
};
</script>

<style>
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  max-width: 100%;
  width: 600px;
  max-width: 100%;
  background-color: rgb(198, 240, 231);
  padding: 1rem;
  border: 2px solid gray;
  border-radius: 5px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 8px 24px,
    rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px;
}

.modal-content h3 {
  margin: 0.5rem 0;
}

.modal-btn-container {
  display: flex;
  justify-content: space-between;
}

.modal-btn {
  appearance: none;
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0,
    rgba(255, 255, 255, 0.25) 0 1px 0 inset;
  box-sizing: border-box;
  cursor: pointer;
  font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-weight: bold;
  margin: 1rem 0 0 0;
  padding: 0.6rem 1.5rem;
  position: relative;
  transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  word-wrap: break-word;
}

.modal-cancel-btn {
  background-color: #fafbfc;
  border: 2px solid rgba(27, 31, 35, 0.15);
}
.modal-cancel-btn a {
  text-decoration: none;
  color: #24292e;
}
.modal-cancel-btn:hover {
  background-color: rgb(4, 77, 77);
  color: whitesmoke;
}
.modal-close-btn {
  background-color: black;
  color: whitesmoke;
}

.modal-close-btn:hover {
  background-color: #ffffff;
  text-decoration: none;
  transition-duration: 0.1s;
  color: rgb(0, 0, 0);
}
</style>
