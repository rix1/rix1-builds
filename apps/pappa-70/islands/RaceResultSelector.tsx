import { signal } from "@preact/signals";
import { bettingOptions } from "./BettingTable.tsx";

export const RaceResultSelector = ({ firstPlace, secondPlace, thirdPlace }) => {
  return (
    <div>
      <h3>Race Results</h3>
      <div>
        <label>1st Place:</label>
        <select
          value={firstPlace.value}
          onChange={(e) => (firstPlace.value = e.target.value)}
        >
          {bettingOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>2nd Place:</label>
        <select
          value={secondPlace.value}
          onChange={(e) => (secondPlace.value = e.target.value)}
        >
          {bettingOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>3rd Place:</label>
        <select
          value={thirdPlace.value}
          onChange={(e) => (thirdPlace.value = e.target.value)}
        >
          {bettingOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
