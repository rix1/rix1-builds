import { DayProgramType } from "../program.ts";
import { titleCase } from "../utils/titleCase.ts";
import Activity from "./Activity.tsx";

type Props = {
  day: DayProgramType;
};

const dateFormatter = new Intl.DateTimeFormat("nb-no", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

function getDateParts(date: Date) {
  const [weekday, ...rest] = dateFormatter.formatToParts(date);

  return [weekday.value, rest.map((part) => part.value).join("")];
}

const Day = ({ day }: Props) => {
  const [weekday, date] = getDateParts(day.date);

  return (
    <details className="mt-10 space-y-6" open>
      <summary className="flex cursor-pointer">
        <h2 className="text-lg border-l-4 pl-3 -ml-4 border-[#99E2F3]">
          <strong>{titleCase(weekday)}</strong> {date}
        </h2>
      </summary>
      {day.activities.map((activity) => (
        <Activity activity={activity} />
      ))}
    </details>
  );
};

export default Day;
