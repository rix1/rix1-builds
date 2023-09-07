export type ActivityType = {
  startTime: string;
  title: string;
  description?: string;
  isRace?: boolean;
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
          startTime: "12:00",
          title: "Tante Sissel kommer til Oslo",
          description: "Flytter inn i U47.",
        },
        {
          startTime: "16:10",
          title: "Arne Martin & Nina lander",
          description:
            "Arne Martin og Nina drar til Nr. 84. Han har burdag og blir 42 år. Bursdag og tidlig i seng.",
        },
        {
          startTime: "16:30",
          title: "Albert 7 år",
          description: "Velkommen til Nr 84; pølser, pizza og kake.",
        },
        {
          startTime: "19:30",
          title: "Eddie lander",
          description: "Flytter inn i Lofotgata.",
        },
      ],
    },
    {
      date: new Date("2023-09-08"),
      activities: [
        {
          startTime: "08:30",
          title: "Bursdagmorgen i U47",
          description:
            'Frokost og kaffe på senga. Husk: "...og se NÅ vil vi masjere".',
        },
        {
          startTime: "10:00",
          title: "Danskene kommer med fergen til Oslo Kai.",
        },
        {
          startTime: "11:00",
          title: "The race 🏃",
          isRace: true,
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
        { startTime: "15:30", title: "Søsken får tilgang til Rococosalen" },
        { startTime: "16:00", title: "Eva hårtime på Høvik" },
        {
          startTime: "17:45",
          title: "Familien samles på Grand",
          description: "Søsken m/følge og mamma og pappa møtes nede kl 17.45",
        },
        {
          startTime: "18:00",
          title: "Velkommen til ball!",
          description: "Få på finstasen, showet starter kl 18 🍾 💃",
          location: {
            mapsLink: "Grand Hotel, Karl Johans gate, Oslo",
            title: "Grand Hotel, Oslo",
          },
          dessCode: "Smoking",
        },
      ],
    },
    {
      date: new Date("2023-09-09"),
      activities: [
        {
          startTime: "09:00",
          title: "Frokost på Grand Hotel",
          description: "Kom når du står opp.",
        },
        {
          startTime: "11:00",
          title: "Badstue og bading for søsken m/følge",
          description: "Mille organiserer det.",
        },
        {
          startTime: "16:00",
          title: "Restefest & kleinspiel i 84",
          description:
            "Bli med danskene på kleinspiel Lillehagveien. Velkommen de som har lyst.",
        },
        {
          startTime: "Litt utpå dagen",
          title: "Sissel drar",
          description:
            "Sissel skal på ny fest lørdag kveld og drar derfor utpå dagen.",
        },
      ],
    },
    {
      date: new Date("2023-09-10"),
      activities: [
        { startTime: "Morgen", title: "💤💤💤💤💤" },
        {
          startTime: "08:00",
          title: "Danskene reiser",
          description: "Danskene reiser med 08.00 – fergen fra Larvik",
        },
        {
          startTime: "13:00",
          title: "Bursdag for Idun",
          description: "Tor Erling og Cecilie inviterer til ettårsdag 👶",
          location: {
            mapsLink: "50 Ruseløkkveien,Oslo",
            title: "Ruseløkkveien 50 (ved Vika), Oslo",
          },
        },
        { startTime: "TBC", title: "Arne Martin & Nina reiser" },
        { startTime: "20:00", title: "Eddie flyr til Stavanger" },
      ],
    },
  ],
};
