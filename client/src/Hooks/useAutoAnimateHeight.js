
import { useEffect, useRef } from "react";
import { useAnimation } from "framer-motion";

export function useAutoHeightAnimation() {
  const controls = useAnimation();
  const ref = useRef(null);
  const height = useRef(null);

  useEffect(() => {
    ref.current.style.height = "auto";
    const newHeight = ref.current.offsetHeight;

    if (height.current !== null) {
      controls.set({ height: height.current });
      controls.start({ height: newHeight });
    }

    height.current = newHeight;
  }, [ref, controls]);

  return [controls, ref];
}
