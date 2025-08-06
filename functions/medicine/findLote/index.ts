import mongoose from "mongoose";
import MedicineSchema from "../../../models/schemas/medicine/index.ts";
import { ParametersQueriesGetLoteMedicine } from "../../../types/functions/medicine/index.ts";
import configStore from "../araia/config.ts";

export async function GetLoteMedicine({
  lote,
}: ParametersQueriesGetLoteMedicine) {
  try {
    await mongoose.connect(configStore.db.connection);

    if (mongoose.connection.readyState) {
      const Medicine = await MedicineSchema.find(
        { lote: lote },
        {
          title: true,
          description: true,
          images: true,
          link: true,
          value: true,
          date: true,
        }
      );
      return Medicine;
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error(
      "Medicine not was insert medicines in database. Please try again more late",
      error
    );
    await mongoose.disconnect();
  }
}
