import { Signal, signal } from "@preact/signals";
import { useEffect, useRef } from "preact/hooks";
import { Spring } from "wobble";

function useSpring(animationValue: Signal) {
  const springRef = useRef<Spring>();

  useEffect(() => {
    springRef.current = new Spring({
      toValue: 0,
      mass: 1.2,
      stiffness: 120,
      damping: 6,
    }).onUpdate((s) => animationValue.value = s.currentValue).start();
    return () => {
      if (springRef.current) {
        springRef.current.removeAllListeners();
      }
    };
  }, []);

  // useEffect(() => {
  //   springRef.current?.updateConfig({ fromValue: active ? startVal : 0 })
  //     .start();
  // }, [active]);

  return springRef;
}

export default useSpring;
