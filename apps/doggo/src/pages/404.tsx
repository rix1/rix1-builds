import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

/* This example requires Tailwind CSS v2.0+ */
const NotFoundPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>404 Not found!</title>
        <meta
          name="description"
          content="Could not find the page you're looking for"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/*
        This example requires updating your template:

        ```
        <html class="h-full">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full pt-16 pb-12 flex flex-col bg-white">
        <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex-shrink-0 flex justify-center mt-12">
            <a href="/" className="inline-flex">
              <span className="sr-only">Workflow</span>
              <img
                className="h-32 w-auto"
                src="https://s3.eu-north-1.amazonaws.com/rix1.dev/confused-dog.gif"
                alt=""
              />
            </a>
          </div>
          <div className="pb-16 pt-5">
            <div className="text-center">
              <p className="text-base font-semibold text-green-600">404</p>
              <h1 className="mt-2 text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl sm:tracking-tight">
                Page not found.
              </h1>
              <p className="mt-2 text-base text-gray-500">
                Sorry, we couldn’t find the page you’re looking for.
              </p>
              <div className="mt-6">
                <Link href="/">
                  <a className="text-base font-medium text-green-600 hover:text-green-500">
                    Go back home<span aria-hidden="true"> &rarr;</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </main>
        {/* <footer className="flex-shrink-0 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-center space-x-4">
            <a
              href="#"
              className="text-sm font-medium text-gray-500 hover:text-gray-600"
            >
              Contact Support
            </a>
            <span
              className="inline-block border-l border-gray-300"
              aria-hidden="true"
            />
            <a
              href="#"
              className="text-sm font-medium text-gray-500 hover:text-gray-600"
            >
              Status
            </a>
            <span
              className="inline-block border-l border-gray-300"
              aria-hidden="true"
            />
            <a
              href="#"
              className="text-sm font-medium text-gray-500 hover:text-gray-600"
            >
              Twitter
            </a>
          </nav>
        </footer> */}
      </div>
    </>
  );
};

export default NotFoundPage;
