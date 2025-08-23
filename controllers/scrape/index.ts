import { Scraping } from "../../functions/medicine/scrape/index.ts";

export const ScrapeController = {
  async find() {

  },
  async save({product}: { product: string }) {
     const { lote } = await Scraping({ product: product });
     return lote;
  },
};
