import { GetLoteMedicine } from "../../functions/medicine/findLote/index.ts";
import { Scraping } from "../../functions/medicine/scrape/index.ts";

export const ScrapeController = {
  async find({lote}: { lote: string }) {
    const data = await GetLoteMedicine({ lote: lote });
    return data;
  },
  async save({product}: { product: string }) {
     const { lote } = await Scraping({ product: product });
     return lote;
  },
};
