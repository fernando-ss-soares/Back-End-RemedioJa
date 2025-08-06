import {
  ParameterFunctionSearchProduct,
  ReturnFunctionSearchProduct,
} from "../../../types/functions/medicine/searchProduct/index.ts";
import { Scraping, FindLote } from "../../medicine/araia/index.ts";

export default async function searchProduct({
  product,
  store,
}: ParameterFunctionSearchProduct): Promise<ReturnFunctionSearchProduct> {
  const Store = store;
  const Product = product;

  if (Store) {
    const { lote } = await Scraping({ product: Product });

    if (lote == null) {
      return {
        products: null,
        lote: false,
        error: true,
        message:
          "Error not was possible found it lote in database. Please try again more late",
      };
    }

    const { medicines } = await FindLote({ lote: lote });

    const hasMedicines = medicines
      ? medicines
      : "Error not was possible found it lote in database. Please try again more late";

    return {
      products: hasMedicines,
      lote: lote,
      error: false,
      message: null,
    };
  }

  return {
    products: null,
    lote: false,
    error: true,
    message:
      "Not was possible found it product in store. Please try again more late",
  };
}
