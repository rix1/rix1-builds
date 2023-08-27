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
      <p className="inline-block">{activity.description}</p>
      {activity.location && (
        <p className="inline-block">
          Sted:{" "}
          <ExternalLink
            href={`https://maps.google.com/maps?q=${activity.location.mapsLink}`}
          >
            {activity.location.title}
          </ExternalLink>
        </p>
      )}
    </div>
  );
};

export default Activity;
