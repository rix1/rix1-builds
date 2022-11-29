/**
 * Borrowed from @use-gesture/core
 * https://github.com/pmndrs/use-gesture/blob/ae3db66f85e93889ab1dd2922d5e16d86dde121d/packages/core/src/utils/maths.ts#L39
 */
export function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(v, max));
}

function rubberband(distance: number, dimension: number, constant: number) {
  if (dimension === 0 || Math.abs(dimension) === Infinity) {
    return Math.pow(distance, constant * 5);
  }
  return (distance * dimension * constant) / (dimension + constant * distance);
}

export function rubberbandIfOutOfBounds(
  position: number,
  min: number,
  max: number,
  constant = 0.15,
) {
  if (constant === 0) return clamp(position, min, max);
  if (position < min) {
    return -rubberband(min - position, max - min, constant) + min;
  }
  if (position > max) {
    return +rubberband(position - max, max - min, constant) + max;
  }
  return position;
}
