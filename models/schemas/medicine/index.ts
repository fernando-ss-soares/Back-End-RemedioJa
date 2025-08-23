import { model, Schema } from "mongoose";

const medicineSchema = new Schema({
  nome: String,
  value: String,
  description: String,
  images: [
    {
      url: String,
    },
  ],
  lote: String,
  date: { type: Date, default: Date.now },
});

const MedicineSchema = model("Medicine", medicineSchema);

export default MedicineSchema;
