import { useEffect, useRef } from "preact/hooks";

const Button = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("mousemove", (ev) => {
        const { currentTarget: target } = ev;
        const rect = target.getBoundingClientRect();
        const x = ev.clientX - rect.left;
        const y = ev.clientY - rect.top;
        ref.current.style.setProperty("--mouse-x", `${x}px`);
        ref.current.style.setProperty("--mouse-y", `${y}px`);
      });
    }
  }, []);

  return (
    <button
      ref={ref}
      class="lux relative tracking-wider text-4xl px-7 py-4 bg-white relative focus:ring rounded-[4px] focus:ring-[1px] focus:ring-[#fff] focus:outline-none h-64 flex"
    >
      <span class="mt-auto">Button Label</span>
      {/* <span class="absolute -inset-1 bg-blue-500 shine" /> */}
    </button>
  );
};

export default Button;
