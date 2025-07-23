import { model, Schema } from "mongoose";

const medicineSchema = new Schema({
  lote: String,
  title: String,
  description: String,
  value: Number,
  images: Array,
  link: String,
  search: String,
  date: { type: Date, default: Date.now }
});

const MedicineSchema = model("Medicine", medicineSchema);

export default MedicineSchema;
