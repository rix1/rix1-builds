import { Head } from "$fresh/runtime.ts";

import { BettingTable } from "../islands/BettingTable.tsx";
import { Payouts } from "../islands/Payouts.tsx";
import { RaceResultSelector } from "../islands/RaceResultSelector.tsx";

const TheRacePage = () => {
  return (
    <>
      <Head>
        <title>Spilleregler for The Race | SiriBet365</title>
        <meta name="title" content="Spilleregler for The Race | SiriBet365" />
        <meta
          name="description"
          content="Åpent for alle medlemmer av La Familia, samt våres danske familie 🇩🇰.  Deltakere må være minst 1 år for å plassere et veddemål."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://metatags.io/" />
        <meta
          property="og:title"
          content="Spilleregler for The Race | SiriBet365"
        />
        <meta
          property="og:description"
          content="Åpent for alle medlemmer av La Familia, samt våres danske familie 🇩🇰.  Deltakere må være minst 1 år for å plassere et veddemål."
        />
        <meta
          property="og:image"
          content="https://family-events.s3.eu-north-1.amazonaws.com/bookie-sm.jpg"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://metatags.io/" />
        <meta
          property="twitter:title"
          content="Spilleregler for The Race | SiriBet365"
        />
        <meta
          property="twitter:description"
          content="Åpent for alle medlemmer av La Familia, samt våres danske familie 🇩🇰.  Deltakere må være minst 1 år for å plassere et veddemål."
        />
        <meta
          property="twitter:image"
          content="https://family-events.s3.eu-north-1.amazonaws.com/bookie-sm.jpg"
        />
      </Head>
      <div className="p-4 max-w-prose mx-auto mb-6">
        {/* Top Image */}
        <div className="mb-8">
          <img
            src="https://family-events.s3.eu-north-1.amazonaws.com/bookie-sm.jpg"
            alt="Top Image"
            className="w-full aspect-video object-cover rounded-lg"
          />
        </div>
        <div className="prose">
          <h2 className="">
            Spilleregler for <strong>The Race</strong> 💰
          </h2>

          <strong>Deltakelsesberettigelse</strong>
          <ol className="list-decimal pl-5">
            <li>
              Åpent for alle medlemmer av La Familia, samt våres danske familie
              🇩🇰
            </li>
            <li>Deltakere må være minst 1 år for å plassere et veddemål.</li>
          </ol>

          <strong>Å plassere veddemål:</strong>
          <ol className="list-decimal pl-5">
            <li>
              Veddemål kan plasseres inntil 08. september 2023, før startskuddet
              går.
            </li>
            <li>
              Hvert veddemål må inkludere forutsigelser for 1., 2., og 3. plass
              blant løperne: Terje, Lars, Arne Martin, Rikard, Ludvik og Edvard.
            </li>
          </ol>

          <strong>Premiepotten:</strong>
          <ol className="list-decimal pl-5">
            <li>Alle innsamlede penger vil være en del av en premiepott.</li>
            <li>
              Den totale premiepotten vil fordeles som følger:
              <ul className="list-disc">
                <li>
                  50% for korrekt forutsigelse av 1., 2., og 3. plass i riktig
                  rekkefølge.
                </li>
                <li>
                  30% for korrekt forutsigelse av 1. og 2. plass i riktig
                  rekkefølge.
                </li>
                <li>20% for korrekt forutsigelse av 1. plass.</li>
              </ul>
            </li>
          </ol>

          <strong>Utbetalinger:</strong>
          <ol className="list-decimal pl-5">
            <li>
              Hvis flere deltakere vinner i en kategori, vil pottprosenten for
              den kategorien fordeles mellom dem i forhold til størrelsen på
              deres individuelle innsatser.
            </li>
            <li>
              I tilfelle av avrundingsproblemer, vil utbetalingene rundes til
              nærmeste øre.
            </li>
          </ol>

          <strong>Hvordan plassere et veddemål:</strong>
          <ol className="list-decimal pl-5">
            <li>
              Finn bookie Siri og fyll ut veddemålsskjemaet med navnet ditt,
              dine forutsigelser for 1., 2. og 3. plass, og beløpet du ønsker å
              satse.
            </li>
            <li>Vipps innsatsbeløpet ditt til 95 16 56 29, før lunsj.</li>
          </ol>
        </div>
       <hr className="my-10" />
      <div className="space-y-6">
        <BettingTable bets={bets} />
        <RaceResultSelector
          firstPlace={firstPlace}
          secondPlace={secondPlace}
          thirdPlace={thirdPlace}
        />
        <Payouts
          bets={bets}
          firstPlace={firstPlace}
          secondPlace={secondPlace}
          thirdPlace={thirdPlace}
        />
      </div>
      </div>
    </>
  );
};

export default TheRacePage;
