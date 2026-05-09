import { getPaintings } from "./src/lib/paintings.ts";

async function run() {
  const paintings = await getPaintings();
  console.log("Paintings:", paintings.map(p => ({ title: p.title, shortDescription: p.shortDescription })));
}

run().catch(console.error);
