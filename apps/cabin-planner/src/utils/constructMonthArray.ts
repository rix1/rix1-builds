import dayjs, { Dayjs } from 'dayjs';

function constructDate(year: number, month: number, day: number) {
  return dayjs().set('year', year).set('month', month).set('date', day);
}

function ensure<T>(
  argument: T | undefined | null,
  message: string = 'This value was promised to be there.',
): T {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }

  return argument;
}

function createDatePadding(
  firstDate: Dayjs,
  lastDate: Dayjs,
): [prefix: Dayjs[], postFix: Dayjs[]] {
  const prefix = new Array(firstDate.day() === 0 ? 6 : firstDate.day() - 1)
    .fill(undefined)
    .map((el, index) => {
      return firstDate.subtract(index + 1, 'days');
    })
    .reverse();

  const daysToPostfix = 6 * 7 - (prefix.length + firstDate.daysInMonth());
  const postFix = new Array(daysToPostfix).fill(undefined).map((el, index) => {
    return lastDate.add(index + 1, 'days');
  });
  return [prefix, postFix];
}

function constructMonthArray(year: number, monthNo: number) {
  const firstDate = constructDate(year, monthNo, 1);
  const months = new Array(firstDate.daysInMonth())
    .fill(undefined)
    .map((el, index) => {
      return constructDate(year, monthNo, index + 1);
    });
  if (months.length < 1) {
    throw new Error('Cannot create month');
  }
  const [prefix, postFix] = createDatePadding(
    firstDate,
    ensure(months[months.length - 1]),
  );

  return [...prefix, ...months, ...postFix];
}

export default constructMonthArray;
