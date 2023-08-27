import { computed, signal } from "@preact/signals-core";

// Slider
export const SLIDER_MIN = 4;
export const SLIDER_DEFAULT = 8;
export const SLIDER_MAX = 60;
export const slider = signal(SLIDER_DEFAULT);

// Water per pie
export const WATER_PER_PIE_DEFAULT = 260;
export const pieSize = signal(WATER_PER_PIE_DEFAULT);

// Ingredients
const WATER_CONSTANT_PER_PIE = 100 / 260;
export const YEAST_GRAMS = 5;
export const SALT_PERCENTAGE = 2.56;
export const hydrationIndex = signal(1);
export const HYDRATION_OPTIONS = [
  [1.6, "62.5%"],
  [1.555, "64%"],
  [1.465, "68%"],
  [1.425, "70%"],
  [1.325, "75%"],
] as const;

// Amounts
const waterPerPie = computed(() => pieSize.value * WATER_CONSTANT_PER_PIE); // per pizza
export const waterAmount = computed(() => slider.value * waterPerPie.value);
export const flourAmount = computed(
  () => waterAmount.value * HYDRATION_OPTIONS[hydrationIndex.value][0],
);
export const honeyAmount = computed(() => (slider.value > 40 ? 10 : 5));
export const saltAmount = computed(() =>
  flourAmount.value * (SALT_PERCENTAGE / 100)
);

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
export const poolishTotal = computed(
  () => poolishBase.value * 2 + YEAST_GRAMS + honeyAmount.value,
);

export const allCombined = computed(() => (waterAmount.value +
  flourAmount.value +
  saltAmount.value +
  YEAST_GRAMS +
  honeyAmount.value)
);
