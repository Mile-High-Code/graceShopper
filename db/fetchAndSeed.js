// We need axios to fetch data in Node.js so -> npm i axios
const { default: axios } = require("axios");
const prisma = require("./prisma");

const fetchAndSeedItems = async () => {
  console.log("...fetching all items");
  const { data } = await axios.get(
    `https://pokeapi.co/api/v2/item?offset=0&limit=500`
  );
  //   console.log(data.results);
  console.log("...Fetching single items");
  const items = await Promise.all(
    data.results.map(async (item) => {
      const { data } = await axios.get(item.url);
      // console.log("Single Item from API", data);
      const newItemObj = {
        name: data.name,
        type: data.category.name,
        description: data?.effect_entries[0]?.effect || null,
        price: data.cost,
        stock: 100,
        imgUrl: data.sprites.default,
        floorId: categoryToFloor(data.category.name),
      };
      // console.log("Single item after reformatting", newItemObj);
      return newItemObj;
    })
  );
  console.log("...seeding items");
  console.log("items from api", items);
  const itemsInDb = await Promise.all(
    items.map((item) => prisma.items.create({ data: item }))
  );
  console.log(itemsInDb);
};

function categoryToFloor(category) {
  //console.log("Category: ", category);
  switch (category) {
    case "stat-boosts":
      return 1;
    case "effort-drop":
      return 2;
    case "medicine":
      return 2;
    case "other":
      return 2;
    case "in-a-pinch":
      return 2;
    case "picky-healing":
      return 2;
    case "type-protection":
      return 2;
    case "baking-only":
      return 2;
    case "collectibles":
      return 5;
    case "evolution":
      return 3;
    case "spelunking":
      return 3;
    case "held-items":
      return 1;
    case "choice":
      return 1;
    case "effort-training":
      return 3;
    case "bad-held-items":
      return 1;
    case "training":
      return 3;
    case "plates":
      return 5;
    case "species-specific":
      return 3;
    case "type-enhancement":
      return 1;
    case "event-items":
      return 5;
    case "gameplay":
      return 6;
    case "plot-advancement":
      return 5;
    case "unused":
      return 5;
    case "loot":
      return 6;
    case "all-mail":
      return 6;
    case "vitamins":
      return 2;
    case "healing":
      return 2;
    case "pp-recovery":
      return 3;
    case "revival":
      return 3;
    case "status-cures":
      return 5;
    case "mulch":
      return 2;
    case "special-balls":
      return 2;
    case "standard-balls":
      return 2;
    case "dex-completion":
      return 6;
    case "scarves":
      return 6;
    case "all-machines":
      return 4;
    case "flutes":
      return 6;
    case "apricorn-balls":
      return 3;
    case "apricorn-box":
      return 2;
    case "data-cards":
      return 3;
    case "jewels":
      return 1;
    case "miracle-shooter":
      return 1;
    case "mega-stones":
      return 3;
    case "memories":
      return 3;
    case "z-crystals":
      return 1;
    case "species-candies":
      return 2;
    case "catching-bonus":
      return 3;
    case "dynamax-crystals":
      return 1;
    case "nature-mints":
      return 2;
    case "curry-ingredients":
      return 2;
    default:
      return 5;
  }
}

const Floors = [
  { name: `B1F: Food & Produce` },
  { name: `1F: Trainers' Zone` },
  { name: `2F: Battle Collection` },
  { name: `3F: TM Corner` },
  { name: `4F: Poké Dolls & Goods` },
  { name: `5F: Rooftop Plaza` },
];

async function seedFloors() {
  console.log("seeding floors...");
  await Promise.all(
    Floors.map((floor) => {
      console.log(floor, "from the map");
      return prisma.floors.create({ data: floor });
    })
  );
}

module.exports = {
  seedFloors,
  fetchAndSeedItems,
};
