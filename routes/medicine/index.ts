import { Hono } from "hono";
import { MedicineController } from "../../controllers/medicine/index.ts";

const MedicineRouter = new Hono();

MedicineRouter.post("/get/searchLote", MedicineController.searchLote);
MedicineRouter.post("/save/searchMedicine", MedicineController.searchMedicine);

export {
  MedicineRouter
};
