<template>
  <section id="resize-container" ref="target">
    <slot></slot>
    <div draggable="true">
      <p>The height ={{ dimensions.height }}</p>
      <p>The width ={{ dimensions.width }}</p>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import useResize from "../composables/useResize";

export default defineComponent({
  name: "ResizeExample",
  setup() {
    const { dimensions, target } = useResize();

    return { target, dimensions };
  },
});
</script>

<style scoped>
#resize-container {
  background-color: rgb(150, 216, 216);
  resize: both;
}
</style>
