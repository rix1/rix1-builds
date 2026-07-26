import { computed, signal } from "@preact/signals-core";

// Slider
export const SLIDER_MIN = 4;
export const SLIDER_DEFAULT = 8;
export const SLIDER_MAX = 60;
export const slider = signal(SLIDER_DEFAULT);

// Dough-ball weight per pie (grams). Ball weight × count is the input to the
// recipe; water and flour are derived from it and the chosen hydration.
export const BALL_WEIGHT_DEFAULT = 260;
export const pieSize = signal(BALL_WEIGHT_DEFAULT);

// Ingredients
// Yeast is the poolish's inoculant, not the final dough's leavening: it
// multiplies overnight and the ripe poolish leavens the whole batch. So it
// scales with poolish flour, not total flour. Vito's ratio is 5g per 300g
// of poolish flour = 1/60, which we keep constant so the poolish always
// ripens on the same 16-24h cold schedule.
const POOLISH_YEAST_RATIO = 1 / 60;
export const SALT_PERCENTAGE = 2.56;
const SALT_FRACTION = SALT_PERCENTAGE / 100;
export const hydrationIndex = signal(1);
// [hydration fraction (water ÷ flour), label]
export const HYDRATION_OPTIONS = [
  [0.625, "62.5%"],
  [0.64, "64%"],
  [0.68, "68%"],
  [0.7, "70%"],
  [0.75, "75%"],
] as const;

// Amounts
// Total dough = ball weight × count. From dough = flour·(1 + hydration + salt)
// we solve for flour, then derive water and salt so a ball always weighs
// `pieSize` grams regardless of hydration. (Yeast + honey are trace — ~1g per
// ball — and fold in via the poolish, so they're left out of the ball weight
// here; this also keeps the computed graph free of dependency cycles.)
export const totalDough = computed(() => slider.value * pieSize.value);
export const flourAmount = computed(() => {
  const hydration = HYDRATION_OPTIONS[hydrationIndex.value][0];
  return totalDough.value / (1 + hydration + SALT_FRACTION);
});
export const waterAmount = computed(
  () => flourAmount.value * HYDRATION_OPTIONS[hydrationIndex.value][0],
);
export const honeyAmount = computed(() => (slider.value > 40 ? 10 : 5));
export const saltAmount = computed(() => flourAmount.value * SALT_FRACTION);

// Steps
function getPoolishSize() {
  const waterAndFlour = waterAmount.value +
    flourAmount.value;

  switch (true) {
    case waterAndFlour > 7200:
      return 2000;
    case waterAndFlour > 2600:
      return 600;
    default:
      return 300;
  }
}

export const poolishBase = computed(getPoolishSize);

// Yeast scales with the poolish (its inoculant), rounded to whole grams so
// it's weighable on a kitchen scale: 300g->5g, 600g->10g, 2000g->33g.
export const yeastAmount = computed(() =>
  Math.round(poolishBase.value * POOLISH_YEAST_RATIO)
);

// True once the poolish hits its top bracket: past here the poolish is a
// smaller share of total flour, so proof time (not yeast) is the limiter.
export const isLargeBatch = computed(() => poolishBase.value >= 2000);

export const poolishTotal = computed(
  () => poolishBase.value * 2 + yeastAmount.value + honeyAmount.value,
);

export const allCombined = computed(() => (waterAmount.value +
  flourAmount.value +
  saltAmount.value +
  yeastAmount.value +
  honeyAmount.value)
);

// A 260g ball stretches to ~30cm. Area (and thus weight) scales with
// diameter², so diameter scales with the square root of ball weight to hold a
// roughly constant crust thickness across ball sizes.
const REFERENCE_BALL_WEIGHT = 260;
const REFERENCE_DIAMETER_CM = 30;
export const pieDiameter = computed(() =>
  Math.round(
    REFERENCE_DIAMETER_CM * Math.sqrt(pieSize.value / REFERENCE_BALL_WEIGHT),
  )
);
