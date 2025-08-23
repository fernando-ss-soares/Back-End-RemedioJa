import mongoose from "mongoose";
import {
  ParameterFunctionFindLote,
  ParameterFunctionScrapingMedicine,
} from "../../../types/functions/medicine/index.ts";
import configStore from "./config.ts";
import MedicineSchema from "../../../models/schemas/medicine/index.ts";
import {
  ParametersCatchInfoMedicine,
  ReturnAPIBrowserlessInfoMedicine,
  ReturnAPIBrowserlessLinksMedicine,
} from "../../../types/functions/medicine/searchProduct/index.ts";

const lote = crypto.randomUUID();

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

export async function LookupMedicine({
  product,
}: {
  product: string | null;
}): Promise<ReturnAPIBrowserlessLinksMedicine | undefined> {
  try {
    const payload = {
      url: `${configStore.webStore}${product}`,
      userAgent: configStore.customUA,
      elements: [
        {
          selector: configStore.selectors.list,
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
      throw new Error("Erro ao fazer scraping");
    }

    const response =
      (await request.json()) as ReturnAPIBrowserlessLinksMedicine;
    return response;
  } catch (error) {
    console.error("Erro ao fazer scraping:", error);
  }
}

export async function CatchMedicine({
  listMedicine,
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

    await mongoose.disconnect();
  } catch (error) {
    await mongoose.disconnect();
    throw new Error("Erro ao fazer scraping" + error);
  }
}

export async function Scraping({ product }: ParameterFunctionScrapingMedicine) {
  try {
    console.log(`🔍 PESQUISANDO MEDICAMENTO: ${product?.toLocaleUpperCase()}`);

    const lookupMedicine = await LookupMedicine({ product });

    if (!lookupMedicine) {
      throw new Error("Erro ao fazer scraping");
    }

    const handlelookupMedicine = lookupMedicine.data[0].results.map((item) => {
      return {
        name: item.text,
        value: item.attributes[0].value,
      };
    });

    console.log(
      `✅ FOI ENCONTRADO ${
        handlelookupMedicine.length
      } LINKS DO MEDICAMENTO: ${product?.toLocaleUpperCase()} \n`
    );

    await CatchMedicine({
      listMedicine: handlelookupMedicine,
    });
    return { lote: lote };
  } catch (error) {
    throw new Error("Erro ao fazer scraping" + error);
  }
}
