import Head from 'next/head';
import dayjs from 'dayjs';

function constructDate(year, month, day) {
  return dayjs().set('year', year).set('month', month).set('date', day);
}

function createMonth(year, monthNo) {
  const firstDate = constructDate(year, monthNo, 1);
  return new Array(firstDate.daysInMonth()).fill().map((el, index) => {
    return constructDate(year, monthNo, index + 1);
  });
}

function createYear(year) {
  return new Array(12).fill().map((el, index) => createMonth(year, index));
}

export default function Home() {
  const year = createYear(2022);
  console.log(year);
  const [jan] = year;

  return (
    <>
      <Head>
        <title>Year calendar</title>
        <meta
          name="description"
          content="Generates yearly calendars for printing"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="month">
        {jan.map((day) => (
          <div key={day.toISOString()} className="day">
            {day.format('D ddd.')}
          </div>
        ))}
      </div>
    </>
  );
}
