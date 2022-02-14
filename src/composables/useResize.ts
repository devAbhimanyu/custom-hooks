import { ref, onMounted, onUnmounted } from "vue";
import debounce from "lodash.debounce";
import ResizeObserver from "resize-observer-polyfill";

/**
 * Composable to attach to element and get its height and width
 * @param {number} debounceTime default 200ms
 * @returns [target, dimension] target ref and dimensions {height,width}
 */
const useResize = (debounceTime: number = 200) => {
  /** target  */
  const target = ref<HTMLElement | null>(null);
  const dimensions = ref({
    height: 0,
    width: 0,
  });

  /** debounce function to set set updated containter dimensions */
  const resize = debounce((width, height) => {
    // console.log("resize called");
    dimensions.value = { width, height };
  }, debounceTime);

  const resizeObserverRef = ref<ResizeObserver | null>(null);

  onMounted(() => {
    resizeObserverRef.value = new ResizeObserver((entries = []) => {
      entries.forEach((entry) => {
        const { width, height } = entry.contentRect;
        resize(width, height);
      });
    });
    if (target.value) {
      resizeObserverRef.value.observe(target.value);
    }
  });

  /**
   * onUnmount cancel the observer subscription
   */
  onUnmounted(() => {
    if (resizeObserverRef.value) {
      //   console.log("unmounted");
      resizeObserverRef.value.disconnect();
    }
  });

  return { target, dimensions };
};

export default useResize;
