import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import BookingForm from '../components/BookingForm';

const Book: NextPage = () => {
  const { query } = useRouter();
  console.log(query);

  return (
    <div className="bg-slate-100 pt-8">
      <Head>
        <title>Book | Cabin planner</title>
        <meta name="description" content="Add a new booking" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BookingForm startDate={query.from} endDate={query.to} />
      </div>
    </div>
  );
};

export default Book;
