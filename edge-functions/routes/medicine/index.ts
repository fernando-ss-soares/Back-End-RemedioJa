import { Hono } from "hono";
import { ParametersQueriesMedicine } from "../../types/functions/index.ts";
import verifyStore from "../../functions/verifyStore/index.ts";
import searchProduct from "../../functions/searchProduct/index.ts";

const MedicineRouter = new Hono();

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

  const hasErrorSearchProductStore = responseSearchProducts.error
    ? true
    : false;

  if (hasErrorSearchProductStore) {
    return c.json({ message: message }, 500);
  }

  return c.json({ data }, 200);
});

export default MedicineRouter;
