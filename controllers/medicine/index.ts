import { Context } from "hono";
import { ParametersQueriesGetLoteMedicine, ParametersQueriesMedicine } from "../../types/functions/medicine/index.ts";

import { GetLoteMedicine } from "../../functions/medicine/findLote/index.ts";
import searchProduct from "../../functions/medicine/searchProduct/index.ts";
import verifyStore from "../../functions/medicine/verifyStore/index.ts";

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
    const { store, product }: ParametersQueriesMedicine = c.req.query();

    const { data, error, message } = verifyStore({ store: store });

    const hasErrorVerifyStore = error ? true : false;

    if (hasErrorVerifyStore) {
      return c.json({ message: message }, 500);
    }

    const responseSearchProducts = await searchProduct({
      store: data?.store,
      product: product,
    });

    const hasErrorSearchProductStore = responseSearchProducts?.error
      ? true
      : false;

    if (hasErrorSearchProductStore) {
      return c.json({ message: message }, 500);
    }

    return c.json(
      {
        medicines: responseSearchProducts?.products,
        lote: responseSearchProducts?.lote,
        requestId: `${c.get('requestId')}`
      },
      200
    );
  },
};
