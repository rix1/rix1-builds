import { ComponentChildren } from "preact";
import { useEffect, useState } from "preact/hooks";
import {
  Chat,
  Heart,
  Home,
  HourGlass,
  Message,
  Sun,
} from "../components/8-bit-icons.tsx";

type Props = {
  classNames: string;
  delay: number;
};

const DelayClasses = (
  { delay = 2000, classNames = "" }: Props,
) => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, delay);
  }, []);

  const lines = [
    { color: "--purple", text: "home", icon: Home },
    { color: "--blue", text: "about", icon: Heart },
    { color: "--green", text: "projects", icon: Chat },
    { color: "--orange", text: "work", icon: Sun },
    { color: "--yellow", text: "writing", icon: HourGlass },
    { color: "--white", text: "contact", icon: Message },
  ];
  return (
    <div className={ready ? classNames : ""}>
      {lines.map(({ color, icon: Icon, text }, index) => (
        <p
          key={color}
          style={{ "--delay": index, "--text-color": `var(${color})` }}
          class="txt relative flex text-5xl items-baseline"
        >
          <span className="ml-auto">{text}</span>{" "}
          <span className="z-10 self-stretch">{<Icon />}</span>
          <span class="stripes" />
        </p>
      ))}
    </div>
  );
};

export default DelayClasses;
