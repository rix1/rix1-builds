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

export const useMouseDown = (ref: RefObject<HTMLInputElement>) => {
  const [isDown, setIsDown] = useState(false);
  useEffect(() => {
    console.log("runniing mouse down effect");

    const element = ref?.current || document;
    const onMouseDown = (ev) => {
      console.log("mouse down!");

      setIsDown(true);
    };
    const onMouseUp = () => {
      console.log("mouse up!");
      setIsDown(false);
    };

    element.addEventListener("mousedown", onMouseDown);
    element.addEventListener("mouseup", onMouseUp);

    return () => {
      element.removeEventListener("mousedown", onMouseDown);
      element.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return isDown;
};
