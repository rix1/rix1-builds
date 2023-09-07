export const Payouts = ({ bets, firstPlace, secondPlace, thirdPlace }) => {
  const calculatePayouts = () => {
    const totalPot = bets.value.reduce(
      (sum, bet) => sum + Number(bet.amount),
      0
    );
    const halfPot = totalPot * 0.5;
    const thirdPot = totalPot * 0.3;
    const fifthPot = totalPot * 0.2;

    const winners = [];

    bets.value.forEach((bet) => {
      let winAmount = 0;

      if (
        bet.first === firstPlace.value &&
        bet.second === secondPlace.value &&
        bet.third === thirdPlace.value
      ) {
        winAmount += halfPot * (bet.amount / totalPot);
      } else if (
        bet.first === firstPlace.value &&
        bet.second === secondPlace.value
      ) {
        winAmount += thirdPot * (bet.amount / totalPot);
      } else if (bet.first === firstPlace.value) {
        winAmount += fifthPot * (bet.amount / totalPot);
      }

      if (winAmount > 0) {
        winners.push({
          name: bet.name,
          winAmount: Math.round(winAmount * 100) / 100,
        });
      }
    });

    return winners.sort((a, b) => b.winAmount - a.winAmount);
  };

  const winners = calculatePayouts();

  return (
    <div>
      <h3>Resulting Payouts</h3>
      {winners.length === 0 ? (
        <p>No winners.</p>
      ) : (
        <ul>
          {winners.map((winner, index) => (
            <li
              key={index}
            >{`${winner.name} wins ${winner.winAmount} units`}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
