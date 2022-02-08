<template>
  <section id="tt" ref="target" :class="bindedClass">
    <slot></slot>
    {{ target?.id }}
  </section>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import useMutation from "../composables/useMutation";

export default defineComponent({
  setup() {
    const checkClassUpdated = (mutation: MutationRecord) => {
      alert(`${mutation.attributeName} updated`);
    };
    const [target] = useMutation("attributes", checkClassUpdated);
    const bindedClass = ref("black");
    setTimeout(() => {
      bindedClass.value = "blue";
    }, 2000);
    return { target, bindedClass };
  },
});
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

.black {
  color: #111;
}
.blue {
  color: rgb(7, 146, 146);
}
</style>
