export type EventTypes = "walk" | "poop" | "food";

export type User = {
  id: string;
  name: string;
  email: string;
  image: string;
};

export type Users = {
  [userId: string]: User;
};

export type TimeSlot = "morning" | "lunch" | "dinner";
export type Activity = "walk" | "poop" | "food";

export type ChecklistItem = {
  id: string;
  timeslot: TimeSlot;
  activity: Activity;
  label: string;
};

export type Event = {
  id: string;
  createdAt: string;
  createdBy: string;
  activity: Activity;
  timeslot: TimeSlot;
};
