export type EventTypes = 'walk' | 'poop' | 'food';

export type User = {
  id: string;
  name: string;
  email: string;
  image: string;
};

export type Users = {
  [userId: string]: User;
};

export type TimeSlotType = 'morning' | 'lunch' | 'dinner';
export type Activity = 'walk' | 'poop' | 'food';

export type TimeSlot = {
  id: string;
  label: string;
  timeFrame: string;
  checklist: ChecklistItem[];
};

export type ChecklistItem = {
  id: string;
  timeslot: TimeSlotType;
  activity: Activity;
  label: string;
};

export type Event = {
  id: string;
  createdAt: string;
  createdBy: string;
  activity: Activity;
  timeslot: TimeSlotType;
};
