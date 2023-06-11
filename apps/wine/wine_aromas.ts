export const wine_aromas = {
  primary: {
    flower: [
      "Iris",
      "Peony",
      "Elderflower",
      "Acaccia",
      "Lilac",
      "Jasmine",
      "Honeysuckle",
      "Violet",
      "Lavender",
      "Rose",
      "Potpourri",
      "Hibiscus",
    ],
    citrus: ["Lime", "Lemon ", "Grapefruit", "Orange", "Marmelade"],
    tree_fruit: [
      "Quince",
      "Apple",
      "Pear",
      "Nectarine",
      "Peach",
      "Apricot",
      "Persimmon",
    ],
    tropical_fruit: [
      "Pineapple",
      "Mango",
      "Guava",
      "Kiwi",
      "Lychee",
      "Bubblegum",
    ],
    red_fruit: [
      "Cranberry",
      "Red Plum",
      "Pomeggranate",
      "Sour Cherry",
      "Strawberry",
      "Cherry",
      "Raspberry",
    ],
    black_fruit: [
      "Boysenberry",
      "Black Currant",
      "Plum",
      "Blackberry",
      "Blueberrry",
      "Olive",
    ],
    dried_fruit: ["Rasin", "Fig", "Date", "Fruitcake"],
    noble_rot: ["Beewox", "Giner", "Honey"],
    spice: [
      "White Pepper",
      "Red Pepper",
      "Black Pepper",
      "Cinnamon",
      "Anis",
      "5-Spice",
      "Fennel",
      "Eucalyptus",
      "Mint",
      "Thyme",
    ],
    vegetable: [
      "Black Tea",
      "Sun Dried Tomato",
      "Tomato",
      "Bitter Almond",
      "Jalapeño",
      "Bell Pepper",
      "Gooseberry",
      "Tomato Leaf",
      "Grass",
    ],
    earth: [
      "Petroleum",
      "Volcanic Rocks",
      "Red Beet",
      "Potting Soil",
      "Wet Gravel",
      "Slate",
      "Clay Pot",
    ],
  },
  secondary: {
    microbial: ["Mushroom", "Truffle", "Lager", "Sourdough", "Cream", "Butter"],
  },
  tertiary: {
    oak_aging: [
      "Dill",
      "Smoke",
      "Cigar Box",
      "Bakin Spices",
      "Coconut",
      "Vanilla",
    ],
    general_aging: [
      "Leather",
      "Cocoa",
      "Coffee",
      "Tobacco",
      "Nuts",
      "Dried Fruit",
    ],
  },
  faults: {
    "tca_(corked)": ["Wet Dog", "Musty Cardboard"],
    "sulfides_&_mercaptans": [
      "Cat Pee",
      "Onion",
      "Garlic",
      "atch Box",
      "Burnt Rubber",
      "Boiled Eggs",
      "Cured Meat",
    ],
    brettanomyces: [
      "Horse Manure",
      "Sweaty Leather Saddle",
      "Band-Aid",
      "Black Cardamon",
    ],
    cooked: ["Stewed Fruit", "Toffee"],
    volatile_acidity: ["Balsamic Vinegar"],
  },
};

type AromaShape = {
  aroma: string;
  category: string;
  taste: string;
  // taste: "primary" | "secondary" | "tertiary" | "faults";
};

function createDetailedObject(tastes: typeof wine_aromas) {
  const list = [] as AromaShape[];
  Object.entries(tastes).forEach((taste) => {
    const taste_name = taste[0];
    Object.entries(taste[1]).forEach((category) => {
      const category_name = category[0].replaceAll("_", " ");
      category[1].forEach((aroma) => {
        list.push({
          aroma,
          category: category_name,
          taste: taste_name,
        });
      });
    });
  });
  return list;
}

export const wine_aroma_list = createDetailedObject(wine_aromas);
