import {
  ParameterFunctionSearchProduct,
} from "../../../types/functions/medicine/searchProduct/index.ts";
import { Scraping } from "../scrape/index.ts";

export default async function searchProduct({
  product,
}: ParameterFunctionSearchProduct) {
  const Product = product;

  const { lote } = await Scraping({ product: Product });

  return lote;
}
