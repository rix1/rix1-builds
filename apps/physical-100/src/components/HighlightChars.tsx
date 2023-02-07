import { start } from "repl";

type Props = {
  str: string;
  indices: Set<number>;
  startAt?: number;
};

const HighlightChars = ({ str, indices, startAt = 0 }: Props) => {
  const chars = str.split("");

  const nodes = chars.map((char, i) => {
    if (indices.has(i + startAt)) {
      return (
        <b className="font-semibold text-red-300" key={i}>
          {char}
        </b>
      );
    } else {
      return char;
    }
  });

  return <>{nodes}</>;
};

export default HighlightChars;
