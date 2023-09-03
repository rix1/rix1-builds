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
    </div>
  );
};

export default Activity;
