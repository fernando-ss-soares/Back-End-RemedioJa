import mongoose from "mongoose";
import {
  ParameterFunctionFindLote,
  ParameterFunctionScrapingMedicine,
} from "../../../types/functions/medicine/index.ts";
import configStore from "./config.ts";
import MedicineSchema from "../../../models/schemas/medicine/index.ts";
import { CatchMedicine } from "./catch/index.ts";
import { LookupMedicine } from "./lookup/index.ts";

export async function FindLote({ lote }: ParameterFunctionFindLote) {
  try {
    await mongoose.connect(configStore.db.connection);

    if (mongoose.connection.readyState) {
      const Medicine = await MedicineSchema.find(
        { lote: lote },
        {
          _id: true,
          title: true,
          description: true,
          value: true,
          images: true,
          link: true,
        }
      );

      if (Medicine && Medicine.length > 0) {
        await mongoose.disconnect();

        return {
          medicines: Medicine,
        };
      }
    }

    await mongoose.disconnect();

    return { medicines: false };
  } catch {
    await mongoose.disconnect();
    return { medicines: false };
  }
}

export async function Scraping({ product }: ParameterFunctionScrapingMedicine) {
  try {
    const lote = crypto.randomUUID();

    console.log(`🔍 PESQUISANDO MEDICAMENTO: ${product?.toLocaleUpperCase()} \n`);

    const lookupMedicine = await LookupMedicine({ product });

    await CatchMedicine({ listMedicine: lookupMedicine as Array<{ name: string; value: string }>, lote: lote });

    return { lote: lote };
  } catch (error) {
    throw new Error("Erro ao fazer scraping" + error);
  }
}
