export type ActivityType = {
  startTime: string;
  title: string;
  description?: string;
  dessCode?: string;
  location?: {
    mapsLink: string;
    title: string;
  };
};

export type DayProgramType = {
  date: Date;
  activities: ActivityType[];
};

type Schedule = {
  title: string;
  days: DayProgramType[];
};

export const schedule: Schedule = {
  title: "Program Pappa 70 år!",
  days: [
    {
      date: new Date("2023-09-07"),
      activities: [
        {
          startTime: "16:30",
          title: "Albert 7 år",
          description: "Velkommen til Nr 84; pølser, pizza og kake",
        },
        {
          startTime: "16:10",
          title: "Arne Martin 42 år",
          description:
            "Arne Martin og Nina lander, kommer til Nr. 84. Bursdag og tidlig i seng.",
        },
        {
          startTime: "12:00",
          title: "Tante Sissel kommer til Oslo",
        },
      ],
    },
    {
      date: new Date("2023-09-08"),
      activities: [
        { startTime: "08:30", title: "Bursdagmorgen i U47" },
        {
          startTime: "10:00",
          title: "Danskene kommer med fergen til Oslo Kai",
        },
        {
          startTime: "11:00",
          title: "The race 🏃",
          description: "Far & 5 sønner løper 300 meter på Bislett Stadion.",
        },
        {
          startTime: "12:15",
          title: "Bursdaglunsj i Huldreveien",
          description:
            "Familien, barnebarna og danskene er invitert til bursdagslunsj.",
        },
        {
          startTime: "15:00",
          title: "Innsjekk Grand Hotel",
          description: "Gjelder bare for de som skal bo på på hotell.",
        },
        { startTime: "15:30", title: "Søsken tilgang til Rococco salen" },
        { startTime: "16:00", title: "Eva hårtime på Høvik" },
        {
          startTime: "17:45",
          title: "Familien Bjørstad Eide møtes utenfor Rococco salen",
        },
        { startTime: "18:00", title: "Velkommen" },
      ],
    },
    {
      date: new Date("2023-09-09"),
      activities: [
        {
          startTime: "09:00",
          title: "Frokost på Grand Hotel",
          description: "komme når man står opp",
        },
        {
          startTime: "11:00",
          title: "Badstue og bading for søsken m/ følge",
          description: "Mille organiserer det.",
        },
        {
          startTime: "16:00",
          title: "Restefest & kleinspiel med danskene i Lillehagveien 84",
          description: "Velkommen de som har lyst",
        },
        {
          startTime: "Unknown",
          title: "Sissel drar",
          description:
            "Sissel skal på fest et annet sted lørdag-søndag og drar derfor lørdag utpå dagen",
        },
      ],
    },
    {
      date: new Date("2023-09-10"),
      activities: [
        { startTime: "Unknown", title: "ZzzzZZZzzZZZzzZZZzzzZZZzzz" },
        {
          startTime: "08:00",
          title: "Danskene reiser",
          description: "Danskene reiser med 08.00 – fergen fra Larvik",
        },
        { startTime: "TBC", title: "Arne Martin & Nina reiser" },
        { startTime: "TBC", title: "Eddie reiser" },
      ],
    },
  ],
};
