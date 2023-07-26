import { computed, signal } from "@preact/signals-core";

// Slider
export const SLIDER_MIN = 4;
const SLIDER_DEFAULT = 4;
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
  switch (true) {
    case slider.value > 40:
      return 2000;
    case slider.value > 20:
      return 600;
    default:
      return 300;
  }
}

export const poolishBase = computed(getPoolishSize);
