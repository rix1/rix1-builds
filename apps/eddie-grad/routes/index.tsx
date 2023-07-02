import { Head } from "$fresh/runtime.ts";
import ExternalLink from "../components/ExternalLink.tsx";
import Counter from "../islands/Counter.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Eddie's graduation 2023</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <div className="px-4 sm:px-6 lg:px-8 mt-8">
          <h1 className="text-2xl font-semibold leading-6 text-gray-900">
            Eddie's graduation 2023 🩺
          </h1>
          <p className="mt-2 text-sm text-gray-700">Plan for the weekend</p>
          <section className="mt-10 space-y-4">
            <h2 className="text-lg border-l-4 pl-3 -ml-4 border-[#99E2F3]">
              <strong>Fredag</strong> 23. juni
            </h2>
            <div>
              <h3 className="font-semibold">
                Fra 12:00 - Velkomsthalloi & innsjekk
              </h3>
              <p className="inline-block">
                Sted:{" "}
                <ExternalLink href="https://maps.google.com/maps?q=Budapest, Erzsébet krt">
                  Corinthia Budapest - Budapest, Erzsébet krt
                </ExternalLink>
              </p>
            </div>
            <div>
              <h3 className="font-semibold">14:00 - Lunsj</h3>
              <p className="inline-block">
                Sted:{" "}
                <ExternalLink href="https://maps.google.com/maps?q=Két Szerecsen, budapest">
                  Két Szerecsen
                </ExternalLink>
              </p>
            </div>
            <div>
              <h3 className="font-semibold">19:30 - Kickoff</h3>
              <p className="inline-block">
                Sted:{" "}
                <ExternalLink href="https://maps.google.com/maps?q=High Note Skybar, budapest">
                  High Note Skybar
                </ExternalLink>
              </p>
              <p>Antrekk: Sommerklær, komfortabelt og fint.</p>
            </div>
          </section>
          <section className="mt-10 space-y-4">
            <h2 className="text-lg border-l-4 pl-3 -ml-4 border-[#DFC2DC]">
              <strong>Lørdag</strong> 24. juni
            </h2>
            <div>
              <h3 className="font-semibold">07:00 - Frokost</h3>
              <p>Vi spiser på hotellet</p>
            </div>
            <div>
              <h3 className="font-semibold">08:30 - Graduation-seremoni</h3>
              <p className="inline-block">
                Sted:{" "}
                <ExternalLink href="https://maps.google.com/maps?q=Papp László Budapest sportaréna">
                  Papp László Budapest sportaréna, Stefánia út 2, 1143
                </ExternalLink>
              </p>
              <p>Antrekk: Pent</p>
            </div>
            <div>
              <h3 className="font-semibold">
                14:00 - Feiringen fortsetter med lunsj
              </h3>
              <p className="inline-block">
                Sted:{" "}
                <ExternalLink href="https://maps.google.com/maps?q=Leo Rooftop, budapest">
                  Leo Rooftop
                </ExternalLink>
              </p>
            </div>
            <div>
              <h3 className="font-semibold">20:00 - Festmiddag</h3>
              <p className="inline-block">
                Sted:{" "}
                <ExternalLink href="https://maps.google.com/maps?q=Felix Kitchen & Bar, budapest">
                  Felix Kitchen & Bar
                </ExternalLink>
              </p>
              <p>Antrekk: Mørk dress</p>
            </div>
            <div>
              <h3 className="font-semibold">23:00 - No mercy 💃</h3>
              <p>Ungarsk folkedans med Gunn & Dr Eide</p>
            </div>
          </section>
          <section className="mt-10 space-y-4">
            <h2 className="text-lg border-l-4 pl-3 -ml-4 border-[#F6ADAF]">
              <strong>Søndag</strong> 25. juni
            </h2>
            <div>
              <h3 className="font-semibold">07:00 - Frokost</h3>
              <p>Vi spiser på hotellet</p>
            </div>
            <div>
              <h3 className="font-semibold">10:00 - Relax & plask</h3>
              <p className="inline-block">Sted: Corinthia Spa</p>
              <p>Antrekk: Badekåpe og svømmeføtter</p>
            </div>
            <div>
              <h3 className="font-semibold">12:00 - Utsjekk</h3>
              <p className="inline-block">
                Spurt om muligheter til sen utsjekk, kan ikke garanteres.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">14:00 - Lunsj</h3>
              <p className="inline-block">
                Sted:{" "}
                <ExternalLink href="https://maps.google.com/maps?q=Robinson Restaurant, budapest">
                  Robinson Restaurant
                </ExternalLink>
              </p>
              <p>Antrekk: Hva enn du måtte ønske.</p>
              <p>
                Ingen planer etter dette - sightseeing, shopping, Costes beach
                club (20 min med taxi- burde bookes om ønskelig) eller Cortile
                Sky Bar&pool (burde bestilles)
              </p>
            </div>
            <div>
              <h3 className="font-semibold">??:?? - Middag før avreise</h3>
              <p>
                Pizza ved operaen før avreise til Oslo gjengen? Trenger ikke
                bestilles.
              </p>
            </div>
          </section>
          <div className="right-3 bottom-1">
            <img
              src="/proud.png"
              className="fixed left-2 bottom-2 -z-10  w-60 md:w-96"
            />
            <img
              className="fixed right-2 bottom-2 -z-10 w-60 md:w-96"
              src="/eddie.png"
            />
          </div>
        </div>
      </div>
    </>
  );
}
