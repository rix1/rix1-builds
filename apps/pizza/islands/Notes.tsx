import { ComponentChild } from "preact";
import {
  allCombined,
  flourAmount,
  pieSize,
  poolishBase,
  poolishTotal,
} from "../lib/recipe.ts";
import { computed } from "@preact/signals";
import { cx } from "../lib/stringUtils.ts";

const Sup = (
  { children, href }: { children: ComponentChild; href: string },
) => (
  <a
    href={href}
    className="align-super text-xs text-blue-500"
  >
    [{children}]
  </a>
);

const Tip = (
  { children }: { children: ComponentChild },
) => (
  <p className="mt-2 italic text-xs">
    {children}
  </p>
);

const Notes = () => {
  const skipAtolyse = poolishBase.value / flourAmount.value > 0.4;

  return (
    <ol className="text-gray-500 mb-2 text-sm list-decimal pl-4 space-y-3">
      <li>
        <strong className="block">Mix Poolish (16-24 hours in advance)</strong>
        Mix together equal parts water and flour together with a{" "}
        <span
          className="help"
          title="Usually the amount of yeast in a poolish is a lot less than what described in this recipe (0.4 - 0.8 grams!). However, since we're storing the poolish in the fridge for more consistent temperature control, 5 grams of yeast isn't too much."
        >
          tiny bit
        </span>{" "}
        of yeast and honey. Let the mix rest on the counter for 60 minutes,
        before placing it in the fridge for 16-24 hours.
        <Tip>
          If you're unsure if the poolish might be under or over developed, see
          if it floats in a bowl of water<Sup href="#ref-test-poolish">3</Sup>.
        </Tip>
      </li>
      <li>
        <strong className={cx("block", skipAtolyse && "line-through")}>
          Optional: Autolyse the flour and water
        </strong>{" "}
        {/* Ken Forksih - page 33  */}
        <span className={cx(skipAtolyse && "line-through")}>
          For improved{" "}
          <span
            className="help"
            title="Resulting in better gas retention and better volume in the finished loafs."
          >
            gluten development
          </span>{" "}
          and{" "}
          <span
            className="help"
            title="The dough's ability to be stretched and hold its shape without being so elastic that it snaps back."
          >
            extensibility
          </span>, autolyse the dough<Sup href="#ref-ken-page-33-autolyse">
            1.2
          </Sup>. Do this by mixing flour and water and let them rest for 15-30
          minutes before adding salt, yeast and the poolish.
        </span>
        {skipAtolyse && (
          <Tip>
            Don't autolyse when half or more of the recipe's total flour is in
            the pre-ferment.In these cases, the final mix have little water
            compared to flour, so autlysing will only create big clumps that are
            impossible to work out manually.
          </Tip>
        )}
      </li>
      <li>
        <strong className="block">Mix</strong>{" "}
        Mix poolish with
        ingredients<Sup href="#ref-richard-bertinet-mix-ingredients">2.1</Sup>
        {" "}
        Get to a place where all ingredients are mixed; the dough should have
        smooth-ish surface and a sticky consistency before you dump it onto the
        counter. Use the slap and fold technique
        <Sup href="#ref-richard-bertinet-slap-and-fold">
          2.2
        </Sup>{" "}
        to build strenght. When things get messy, "take the dog for a
        walk"<Sup href="#ref-richard-bertinet-walking-the-dog">2.3</Sup>. Try to
        do this until the dough let's go from your hands. Always keep the top on
        top. For optimal flavour, the final mix temperature should be between
        24°C and 27°C <Sup href="#ref-ken-page-28-temperature">1.1</Sup>.
      </li>
      <li>
        <strong className="block">
          Make it smooth (rest 15min)
        </strong>{" "}
        Let it rest for 15 minutes on the counter before doing a few more folds.
        Drag it towards you{" "}
        <Sup href="#ref-pull-dough-along-the-counter">4</Sup>{" "}
        on the counter to apply tension. After this, the dough shouldn't be too
        sticky anymore, and the surface will be super smooth. Higher hydration
        doughts can benefit from three or four folds during bulk fermenting to
        give them the appropriate strength<Sup href="#ref-ken-forkish-folding">
          1.3
        </Sup>, consider this the first bulk ferment fold.
      </li>
      <li>
        <strong className="block">
          Bulk ferment until double in size (1-3hr)
        </strong>{"  "}
        Lightly coat the the (big) smooth ball with olive oil and let it rest in
        a container on the counter until it's doubled in size. Apply additional
        folds as you see the dough flatten out, to firm it up a bit. Just don't
        fold it during the last hour of bulk fermenting. The time needed for
        this is hard to judge as it depends on your ambient temperature. If it's
        below 24°C, you might have to wait several hours before seeing any
        development.
        <Tip>
          Tip: Take a small portion of the dough aside in a glass jar. Add a
          rubber band to mark the current dough level, this let you measure
          proofing more easily.
        </Tip>
      </li>
      <li>
        <strong className="block">Divide into balls</strong>{" "}
        After it's doubled in size, divide into{" "}
        {pieSize.value}g balls. Again, always "keep top on
        top"<Sup href="#ref-richard-bertinet-two sides">2.4</Sup>: The smooth
        surface should face up, the sticky bottom should face down. If you
        didn't fold in the previous step, the dough might be very soft and hard
        to handle. This is ok. Just fold each ball a few times to firm it up.
        Coat each ball in olive oil.
      </li>
      <li>
        <strong className="block">Rest (30min)</strong>{" "}
        Let the balls rest for at least 30 minutes. If you don't plan on baking
        them within the next hour, consider{" "}
        <span
          className="help"
          title="Place them in a cool chamber that literally retards the development of the dough."
        >
          retarding
        </span>{" "}
        them.
      </li>{" "}
      <li>
        <strong className="block">Re-shape balls, apply tension</strong>{" "}
        Re-shape the rested balls again. Now, apply more tension by pulling them
        towards you on the counter. The ball should be firm and smooth. Use the
        "finger dent test"{" "}
        <Sup href="#ref-ken-page-74-finger-dent-test">1.4</Sup>.
      </li>
      <li>
        <strong className="block">Rest (15-20min)</strong>{" "}
        The balls will be too tight to stretch out at this point, so let them
        rest up a bit.
      </li>
      <li>
        <strong className="block">Bake!</strong>{" "}
        You're finally ready to form the balls into pies. Use semolina flour and
        stretch them into roughly {Math.round(30 / 260 * pieSize.value)}cm pies.
        <Tip>
          Tip: If you're using a home oven, pre-bake the pie with sauce before
          adding topping and baking it a second time.
        </Tip>
      </li>
    </ol>
  );
};

export default Notes;
