import { onUnmounted, ref, watch, watchEffect } from "vue";

/**
 * A generic cmoposable to l
 * @param {string} type mutation type
 * @param callback to be invoked when mutation type is invoked, returns a ref to the mutation object {MutationRecord}
 * @param  config Options for the observer (which mutations to observe)
 * @returns target node ref, this needs to be attached to the element ref
 */
const useMutation = (
  type: MutationRecord["type"],
  callback: Function,
  config = {
    attributes: true,
  }
) => {
  const target = ref<HTMLElement | null>(null);

  const maincallback = function (mutationsList: MutationRecord[], obs: any) {
    // Use traditional 'for loops' for IE 11
    for (const mutation of mutationsList) {
      if (mutation.type === type) {
        callback(mutation);
      }
    }
  };

  const observer = new MutationObserver(maincallback);

  watch(
    target,
    (current) => {
      console.log("inside watch");
      if (current) {
        console.log("inside effect");
        observer.observe(current, config);
      }
    },
    { immediate: true }
  );

  onUnmounted(() => {
    console.log("inside unmount");

    observer.disconnect();
  });

  return [target];
};

export default useMutation;
