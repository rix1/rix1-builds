import { Activity } from '@prisma/client';

const activityMapping = {
  [Activity.WALK]: { label: Activity.WALK, icon: '🦮' },
  [Activity.POOP]: { label: Activity.POOP, icon: '💩' },
  [Activity.PEE]: { label: Activity.PEE, icon: '💦' },
  [Activity.TRAINING]: { label: Activity.TRAINING, icon: '🧠' },
  [Activity.SOCIALIZE]: { label: Activity.SOCIALIZE, icon: '🤗' },
  [Activity.FOOD]: { label: Activity.FOOD, icon: '🍗' },
  [Activity.OTHER]: { label: Activity.OTHER, icon: '🤷‍♀️' },
};

export default activityMapping;
