import Github from '@geist-ui/icons/github';
import Instagram from '@geist-ui/icons/instagram';
import Linkedin from '@geist-ui/icons/linkedin';
import Twitter from '@geist-ui/icons/twitter';
import Link from 'components/Link';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import PagePattern from '../components/PagePattern';
import ProjectSection from '../components/ProjectSection';

const Home: NextPage = () => {
  return (
    <PagePattern>
      <Head>
        <title>rix1.dev: Product developer from Norway</title>
        <meta
          property="og:title"
          content="rix1.dev: Product developer from Norway"
        />
        <meta property="og:image:height" content="600" />
        <meta property="og:image:width" content="1200" />
        <meta
          property="og:image:alt"
          content="On the internet, I'm usually referred to as @rix1. I'm a product developer at Otovo, living in Oslo, Norway."
        />
        <meta
          property="og:image"
          content="https://s3.eu-north-1.amazonaws.com/rix1.dev/social-image.png"
        />
        <meta
          name="twitter:title"
          content="rix1.dev: Product developer from Norway"
        />
        <meta
          name="twitter:description"
          content="Dev, design, product and hooman. Currently having fun chasing the sun together with @OtovoSolar"
        />
        <meta
          name="twitter:image:src"
          content="https://s3.eu-north-1.amazonaws.com/rix1.dev/social-image.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@rix1" />
      </Head>
      <div className="mx-auto max-w-7xl px-4 py-4 font-athelas font-semibold sm:px-6 lg:px-8">
        <section className="mx-auto max-w-3xl text-center">
          <div className="inline-block h-24 w-24 rounded-full shadow-lg">
            <Image
              width="96px"
              height="96px"
              className="h-24 w-24 rounded-full"
              src="https://s3.eu-north-1.amazonaws.com/rix1.dev/first-thursday-450x450.jpg"
              alt=""
              unoptimized
            />
          </div>
          <h1 className="my-5 text-center text-5xl font-bold">
            Hello, world! 👋
          </h1>
          <blockquote className="text-2xl leading-normal">
            <p className="">
              On the internet, I&apos;m usually referred to as{' '}
              <Link href="https://twitter.com/rix1">@rix1</Link>. <br />{' '}
              I&apos;m a{' '}
              <Link href="https://github.com/rix1">product developer</Link> at{' '}
              <Link href="https://twitter.com/@otovosolar">Otovo</Link>, living
              in Oslo, Norway. I used to be a brother and mother to{' '}
              <Link href="https://lh3.googleusercontent.com/pw/AM-JKLX0h8SioeSYDVLLX7S8bHISvHHm-hYancToyZbyvGGYyKpXt_ItTzNa7znM_MJR6Xq3Xn7oCMPKk5HHuAfiRaLk1ssV3q-q3hBtM_OxuwR8VC4WKlCcq6Klg9fmNoeFgvHsust7p5TF_RsmYSqZsb895A=w1536-h2049-no?authuser=0">
                Sam
              </Link>
              , an old belgian shepard full of wisdom. I occationally{' '}
              <Link href="/posts">write</Link>, but not as often as I aspire to.
            </p>
          </blockquote>
          <div className="mt-8 flex justify-center space-x-5">
            <a href="https://twitter.com/rix1" target="_blank" rel="noreferrer">
              <Twitter />
            </a>
            <a href="https://github.com/rix1" target="_blank" rel="noreferrer">
              <Github />
            </a>
            <a
              href="https://instagram.com/rix1"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram />
            </a>
            <a
              href="https://linkedin.com/in/riix1"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin />
            </a>
            <a href="https://keybase.io/rix1" target="_blank" rel="noreferrer">
              <svg
                width="22px"
                height="22px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.445 21.372a.953.953 0 11-.955-.954c.524 0 .951.43.951.955m5.923-.001a.953.953 0 11-.958-.954c.526 0 .954.43.954.955m4.544-9.16l-.156-.204c-.046-.06-.096-.116-.143-.175-.045-.06-.094-.113-.141-.169-.104-.12-.21-.239-.32-.359l-.075-.08-.091-.099-.135-.13c-.015-.019-.032-.035-.05-.054a10.87 10.87 0 00-3.955-2.504l-.23-.078.035-.083a4.109 4.109 0 00-.12-3.255 4.11 4.11 0 00-2.438-2.16c-.656-.216-1.23-.319-1.712-.305-.033-.105-.1-.577.496-1.848L10.662 0l-.287.399c-.33.455-.648.895-.945 1.328a1.857 1.857 0 00-1.245-.58L6.79 1.061h-.012c-.033-.003-.07-.003-.104-.003-.99 0-1.81.771-1.87 1.755l-.088 1.402v.003a1.876 1.876 0 001.755 1.98l1.002.06c-.065.84.073 1.62.405 2.306a11.28 11.28 0 00-3.66 2.484C.912 14.392.912 18.052.912 20.995v1.775l1.305-1.387c.266.93.652 1.807 1.145 2.615H5.06a9.197 9.197 0 01-1.68-3.848l1.913-2.03-.985 3.09 1.74-1.267c3.075-2.234 6.745-2.75 10.91-1.53 1.806.533 3.56.04 4.474-1.256l.104-.165c.09.498.14.998.14 1.496 0 1.563-.254 3.687-1.38 5.512h1.612c.776-1.563 1.181-3.432 1.181-5.512-.001-2.2-.786-4.421-2.184-6.274zM8.894 6.192c.122-1.002.577-1.949 1.23-2.97a1.36 1.36 0 001.283.749c.216-.008.604.025 1.233.232a2.706 2.706 0 011.608 1.425c.322.681.349 1.442.079 2.15a2.69 2.69 0 01-.806 1.108l-.408-.502-.002-.003a1.468 1.468 0 00-2.06-.205c-.334.27-.514.66-.534 1.058-1.2-.54-1.8-1.643-1.628-3.04zm4.304 5.11l-.52.425a.228.228 0 01-.323-.032l-.11-.135a.238.238 0 01.034-.334l.51-.42-1.056-1.299a.307.307 0 01.044-.436.303.303 0 01.435.041l2.963 3.646a.309.309 0 01-.168.499.315.315 0 01-.31-.104l-.295-.365-1.045.854a.244.244 0 01-.154.055.237.237 0 01-.186-.09l-.477-.58a.24.24 0 01.035-.335l1.05-.858-.425-.533zM7.752 4.866l-1.196-.075a.463.463 0 01-.435-.488l.09-1.4a.462.462 0 01.461-.437h.024l1.401.091a.459.459 0 01.433.488l-.007.101a9.27 9.27 0 00-.773 1.72zm12.525 11.482c-.565.805-1.687 1.08-2.924.718-3.886-1.141-7.397-.903-10.469.7l1.636-5.122-5.29 5.609c.098-3.762 2.452-6.967 5.757-8.312.471.373 1.034.66 1.673.841.16.044.322.074.48.102a1.41 1.41 0 00.21 1.408l.075.09c-.172.45-.105.975.221 1.374l.476.582a1.39 1.39 0 001.079.513c.32 0 .635-.111.886-.314l.285-.232c.174.074.367.113.566.113a1.45 1.45 0 00.928-.326c.623-.51.72-1.435.209-2.06l-1.67-2.057a4.07 4.07 0 00.408-.38c.135.036.27.077.4.12.266.096.533.197.795.314a9.55 9.55 0 012.77 1.897c.03.03.06.055.086.083l.17.176c.038.039.076.079.11.12.08.085.16.175.24.267l.126.15c.045.053.086.104.13.16l.114.15c.04.05.079.102.117.154.838 1.149.987 2.329.404 3.157v.005zM7.718 4.115l-.835-.05.053-.836.834.051z" />
              </svg>
            </a>
          </div>
        </section>
        <hr className="my-8 mx-auto w-1/3" />
        <section className="mx-auto">
          <ProjectSection />
        </section>
      </div>
    </PagePattern>
  );
};

export default Home;
