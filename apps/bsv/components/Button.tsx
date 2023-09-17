import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class={[
        "border-gray-500 bg-white hover:bg-gray-200 transition-colors focus:ring-2 ring-offset-[1px] focus:ring-black outline-none focus:z-10",
        props.class,
      ].join(" ")}
    />
  );
}
