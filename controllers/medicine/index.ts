import { Context } from "hono";
import { ParametersQueriesGetLoteMedicine, ParametersQueriesMedicine } from "../../types/functions/medicine/index.ts";
import { GetLoteMedicine } from "../../functions/medicine/findLote/index.ts";
import { ScrapeController } from "../scrape/index.ts";

export const MedicineController = {
  async searchLote(c: Context) {
    const { lote }: ParametersQueriesGetLoteMedicine = c.req.query();

    const loteMedicine = await GetLoteMedicine({ lote: lote });

    return c.json({
      loteMedicine,
      requestId: `${c.get('requestId')}`
    }, 200);
  },
  async searchMedicine(c: Context) {
    const { product }: ParametersQueriesMedicine = c.req.query();

    const lote = await ScrapeController.save({ product: product });

    return c.json(
      {
        lote: lote,
        requestId: `${c.get('requestId')}`
      },
      200
    );
  },
};
