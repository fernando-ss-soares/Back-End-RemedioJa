import { Hono } from "hono";
import { ParametersQueriesGetLoteMedicine, ParametersQueriesMedicine } from "../../types/functions/index.ts";
import verifyStore from "../../functions/verifyStore/index.ts";
import searchProduct from "../../functions/searchProduct/index.ts";
import { GetLoteMedicine } from "../../functions/findLote/index.ts";

const MedicineRouter = new Hono();
const GetloteMedicineRouter = new Hono();

GetloteMedicineRouter.post("/searchLote", async (c) => {

  const { lote }: ParametersQueriesGetLoteMedicine = c.req.query();

  const loteMedicine = await GetLoteMedicine({ lote: lote })

  return c.json(
    loteMedicine,
    200
  );
});

MedicineRouter.post("/searchMedicine", async (c) => {
  const { store, product }: ParametersQueriesMedicine = c.req.query();

  const { data, error, message } = verifyStore({ store });

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
    },
    200
  );
});

export {
  MedicineRouter,
  GetloteMedicineRouter
};
