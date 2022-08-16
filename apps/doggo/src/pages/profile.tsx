import { UserCircleIcon } from '@heroicons/react/solid';
import { NextPage } from 'next';
import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import GithubIcon from '../components/GithubIcon';
import Navbar from '../components/Navbar';

const ProfilePage: NextPage = ({ isLoading }: ProfilePage) => {
  const { data } = useSession();
  return (
    <>
      <Head>
        <title>Doggo</title>
        <meta name="description" content="Your favourite Dog tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="container mx-auto flex flex-col min-h-screen p-4">
        <div className="mt-6">
          <div className="flex ml-4">
            <img
              className="h-16 w-16 rounded-full"
              src={data?.user?.image}
              alt=""
            />
            <div className="ml-3">
              <h1 className="text-3xl font-bold leading-none">
                {data?.user?.name}
              </h1>
              <p className="text-sm text-gray-400 mt-2">
                <GithubIcon className="w-4 h-4 text-gray-400 inline align-text-top" />{' '}
                Signed in with Github
              </p>
              <p className="text-sm text-gray-400 mt-1">
                <button
                  className="underline"
                  onClick={() => {
                    signOut({
                      callbackUrl: '/',
                    });
                  }}
                >
                  Sign out
                </button>
              </p>
            </div>
          </div>

          <div className="space-y-10 sm:space-y-0 space-x-0 sm:space-x-10 pt-8 flex flex-col sm:flex-row mt-8">
            <h2 className="text-2xl font-bold">Stats</h2>
          </div>
        </div>
      </main>
    </>
  );
};

// @ts-ignore
ProfilePage.auth = {
  loading: (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Loading your profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="container mx-auto flex flex-col min-h-screen p-4">
        <div className="mt-6">
          {/* <div className="relative overflow-hidden before:rounded-full before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-rose-100/10 before:bg-gradient-to-r before:from-transparent before:via-rose-100/10 before:to-transparent"> */}
          <div className="inline-block">
            <div className="flex ml-4">
              <UserCircleIcon className="h-16 w-16 text-gray-400" />
              <div className="ml-3">
                <h1 className="text-3xl font-bold leading-none">Loading...</h1>
                <p className="text-sm text-gray-400 mt-2">
                  Fetching profile details...
                </p>
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </main>
    </>
  ),
  redirectUrl: '/login',
};

export default ProfilePage;
