import {
  ParameterFunctionSearchProduct,
  ReturnFunctionSearchProduct,
} from "../../types/functions/searchProduct/index.ts";

import ScrapingAraia from "../araia/index.ts";
import ScrapingAraujo from "../araujo/index.ts";
import ScrapingPagueMenos from "../pagueMenos/index.ts";

export default async function searchProduct({
  product,
  store,
}: ParameterFunctionSearchProduct): Promise<ReturnFunctionSearchProduct> {
  const Store = store;
  const Product = product;

  if (Store == "araia") {
    const scraping = await ScrapingAraia({ product: Product });

    return {
      products: scraping,
      error: false,
      message: null,
    };
  }

  if (Store == "araujo") {
    const scraping = await ScrapingAraujo({ product: Product });

    return {
      products: scraping,
      error: false,
      message: null,
    };
  }

  if (Store == "paguemenos") {
    const scraping = await ScrapingPagueMenos({ product: Product });

    return {
      products: scraping,
      error: false,
      message: null,
    };
  }

  return {
    products: null,
    error: true,
    message:
      "Not was possible found it product in store. Please try again more late",
  };
}
