import mongoose from "mongoose";
import MedicineSchema from "../../../../models/schemas/medicine/index.ts";
import { ParametersCatchInfoMedicine, ReturnAPIBrowserlessInfoMedicine } from "../../../../types/functions/medicine/searchProduct/index.ts";
import configStore from "../config.ts";

export async function CatchMedicine({
  listMedicine,
  lote
}: ParametersCatchInfoMedicine) {
  try {
    const Medicine =
      listMedicine.length > 10 ? listMedicine.slice(0, 10) : listMedicine;
    const ExportDataListMedicine = [];

    console.log(`🔍 COLETANDO AS INFORMAÇÕES DO MEDICAMENTOS... \n`);

    for await (const element of Medicine) {
      const payload = {
        url: `${configStore.webStoreProduct}${element.value}`,
        userAgent: configStore.customUA,
        elements: [
          {
            selector: configStore.selectors.title,
          },
          {
            selector: configStore.selectors.value,
          },
          {
            selector: configStore.selectors.description,
          },
          {
            selector: configStore.selectors.images,
          },
        ],
      };

      const request = await fetch(
        "https://labs.beepcore.com.br/scrape?token=Y6zoj7a2M3QkvCbOXwNKaVoSEDw2ReBb",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!request.ok) {
        console.error(request);
        throw new Error("Erro ao fazer scraping");
      }

      const response =
        (await request.json()) as ReturnAPIBrowserlessInfoMedicine;

      ExportDataListMedicine.push({
        lote: lote,
        nome: response.data[0].results[0].text,
        value: response.data[1].results[0].text,
        description: response.data[2].results[0].text,
        images: response.data[3].results.map((drug) => {
          return {
            url: drug?.attributes[0].value,
          };
        }),
      });
    }

    console.log(`✅ INFORMAÇÕES COLETADAS COM SUCESSO DOS MEDICAMENTOS. \n`);

    await mongoose.connect(configStore.db.connection);

    if (mongoose.connection.readyState) {
      console.log(`💾 SALVANDO INFORMAÇÕES COLETADAS... \n`);
      const Medicine = await MedicineSchema.insertMany(ExportDataListMedicine);

      if (Medicine && Medicine.length > 0) {
        await mongoose.disconnect();
        console.log(`💾 SALVO COM SUCESSO AS INFORMAÇÕES COLETADAS. \n`);
        return {
          lote: lote,
        };
      }
    }
  } catch (error) {
    await mongoose.disconnect();
    throw new Error("Erro ao fazer scraping" + error);
  }
}