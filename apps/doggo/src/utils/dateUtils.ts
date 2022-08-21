/**
 * Copied from https://stackoverflow.com/a/12863278/3008267
 * Tyler Durden's solution is most elegant, but may need some explanation.
 * The beauty of the algorithm is the statement:
 *
 * (m*306 + 5)/10
 *
 * Which returns the number of days between March 1st, and the start of the
   'm'th month after March. (If you want to prove it, just remember to use
   'integer division' which truncates decimal parts)
 * To shoe horn standard dating conventions into this function, input values for
   month and year are shifted so that the calendar 'starts' in March instead of
   January.
 *
 * m = (m + 9) % 12
 * y = y - m/10
 *
 * Implementing this handles the problem of calculating "days per month" and
   leaves only 'days per year' to be calculated. Wikipedia provides sufficient
   explanation for that part. http://en.wikipedia.org/wiki/Leap_year#Algorithm
 */

function g(year: number, month: number, day: number) {
  const m = (month + 9) % 12;
  const y = year - Math.floor(year / 10);
  return (
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) +
    Math.floor((m * 306 + 5) / 10) +
    (day - 1)
  );
}

export function daysBetween(first?: Date, last?: Date) {
  if (!first || !last) {
    return 0;
  }
  return (
    g(first.getFullYear(), first.getMonth(), first.getDate()) -
    g(last.getFullYear(), last.getMonth(), last.getDate())
  );
}
