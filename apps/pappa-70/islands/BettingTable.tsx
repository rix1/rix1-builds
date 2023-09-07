import { signal } from "@preact/signals";

export const bettingOptions = [
  "Terje",
  "Lars",
  "Arne Martin",
  "Rikard",
  "Ludvik",
  "Edvard",
];

export const BettingTable = ({ bets }) => {
  const addBet = () => {
    console.log("clicked!");

    bets.value = [
      ...bets.value,
      { name: "", first: "", second: "", third: "", amount: 0 },
    ];
  };

  const updateBet = (index, field, value) => {
    const newBets = [...bets.value];
    newBets[index][field] = value;
    bets.value = newBets;
  };

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th>Name</th>
          <th>1st</th>
          <th>2nd</th>
          <th>3rd</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {bets.value.map((bet, index) => (
          <tr key={index}>
            <td>
              <input
                type="text"
                value={bet.name}
                onChange={(e) => updateBet(index, "name", e.target.value)}
              />
            </td>
            <td>
              <select
                value={bet.first}
                onChange={(e) => updateBet(index, "first", e.target.value)}
              >
                {bettingOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <select
                value={bet.second}
                onChange={(e) => updateBet(index, "second", e.target.value)}
              >
                {bettingOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <select
                value={bet.third}
                onChange={(e) => updateBet(index, "third", e.target.value)}
              >
                {bettingOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <input
                type="number"
                value={bet.amount}
                onChange={(e) => updateBet(index, "amount", e.target.value)}
              />
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="5">
            <button onClick={addBet}>Add Bet</button>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};
