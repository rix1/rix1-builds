import { RefObject } from "preact";
import { useEffect, useState } from "preact/hooks";

export const useMousePosition = () => {
  const [
    mousePosition,
    setMousePosition,
  ] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev: WindowEventMap["mousemove"]) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    document.addEventListener("mousemove", updateMousePosition);

    return () => {
      document.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);
  return mousePosition;
};

export const useMouseDown = (
  ref: RefObject<HTMLInputElement>,
  cb: () => void,
) => {
  useEffect(() => {
    const element = ref?.current || document;
    element.addEventListener("mousedown", cb);

    return () => {
      element.removeEventListener("mousedown", cb);
    };
  }, []);
};
