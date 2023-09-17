export default function cls(...classnames: Array<string | boolean>) {
  return classnames.filter(Boolean).join(" ");
}
