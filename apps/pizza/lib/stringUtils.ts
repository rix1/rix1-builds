export function cx(...classes: Array<string | boolean>) {
  return classes.filter(Boolean).join(" ");
}
