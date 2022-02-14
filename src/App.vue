<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref } from "vue";
import Placeholder from "./components/Placeholder.vue";
import ResizeVue from "./components/Resize.vue";

const show = ref(true);
setTimeout(() => {
  show.value = false;
}, 2000);
</script>

<template>
  <Placeholder msg="Hello Vue 3 + TypeScript + Vite">
    <section>initial</section>
  </Placeholder>
  <ResizeVue v-if="show"></ResizeVue>
</template>

<style></style>
