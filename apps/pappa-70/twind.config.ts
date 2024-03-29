import { Options } from "$fresh/plugins/twind.ts";
import typography from "https://esm.sh/@twind/typography@0.0.2";

export default {
  selfURL: import.meta.url,
  plugins: {
    // @ts-ignore: this  is actually callable
    ...typography(),
  },
} as Options;
