import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import BookingForm from '../components/BookingForm';
import Navbar from '../components/Navbar';

const Book: NextPage = () => {
  const { query } = useRouter();
  console.log(query);

  return (
    <div className="bg-slate-100 min-h-screen">
      <Navbar cta={null} />
      <Head>
        <title>Book | Cabin planner</title>
        <meta name="description" content="Add a new booking" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BookingForm />
      </div>
    </div>
  );
};

export default Book;
