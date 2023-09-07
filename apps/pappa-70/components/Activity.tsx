import { ActivityType } from "../program.ts";
import ExternalLink from "./ExternalLink.tsx";

type Props = {
  activity: ActivityType;
};

const Activity = ({ activity }: Props) => {
  return (
    <div>
      <h3 className="font-semibold">
        {activity.startTime} - {activity.title}
      </h3>
      {activity.description && <p className="">{activity.description}</p>}
      {activity.location && (
        <p className="">
          Sted:{" "}
          <ExternalLink
            href={`https://maps.google.com/maps?q=${activity.location.mapsLink}`}
          >
            {activity.location.title}
          </ExternalLink>
        </p>
      )}
      {activity.dessCode && <p>Antrekk: {activity.dessCode}</p>}
      {activity.isRace && (
        <div className="bg-green-100 text-green-800 inline-block p-3 mt-2 rounded-md">
          <strong className="text-green-900">
            Vil du vedde på hvem som vinner?
          </strong>
          <p>
            Finn bookie på Bislett.{" "}
            <a className="underline" href="/the-race">
              Les regler for deltagelse.
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default Activity;
