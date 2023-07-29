import { pieSize } from "../lib/recipe.ts";

const Notes = () => {
  return (
    <ol className="text-gray-500 mb-2 text-sm list-decimal pl-4 space-y-2">
      <li>
        <strong>Mix:</strong>{" "}
        Mix poolish with ingredients. Don't overwork the dough at this point,
        but get to a place where all ingredients are mixed and the dough have a
        sticky consistency with a rough surface.
      </li>
      <li>
        <strong>Easy rest and fold (15min):</strong>{" "}
        Let it rest for 15 minutes before doing a few more folds. After this,
        the dough shouldn't be sticky anymore, and the surface will be super
        smooth.
      </li>
      <li>
        <strong>Rest (45-60min):</strong>{"  "}
        Let the (big) smooth ball rest in a container coated with olive oil
        until it's doubled in size at room temperature.
      </li>
      <li>
        <strong>Divide into balls:</strong>{" "}
        After it's doubled in size, divide into{" "}
        {pieSize.value}g balls. Just fold a few times to shape the balls, but
        don't apply too much tension. Coat each ball in olive oil.
      </li>
      <li>
        <strong>Rest (30min):</strong> Let the balls rest for approx 30 minutes.
      </li>{" "}
      <li>
        <strong>Re-shape balls, apply tension:</strong>{" "}
        Re-shape the rested balls, but now apply more tension by pulling them
        towards you on the counter. The ball should be firm and smooth.
      </li>
      <li>
        <strong>Rest (15-20min):</strong>{" "}
        The balls will be too tight to stretch out at this point, so let them
        rest up a bit.
      </li>
      <li>
        <strong>Bake!</strong>{" "}
        You're finally ready to form the balls into pies. Use semolina flour and
        stretch them into {Math.round(30 / 260 * pieSize.value)}cm pies.
        <p className="mt-2">
          Tip: If you're using a home oven, pre-bake the pie with sauce before
          adding topping and baking it a second time.
        </p>
      </li>
    </ol>
  );
};

export default Notes;
