import { ReturnAPIBrowserlessLinksMedicine } from "../../../../types/functions/medicine/searchProduct/index.ts";
import configStore from "../config.ts";

export async function LookupMedicine({
  product,
}: {
  product: string | null;
}): Promise<Array<{ name: string; value: string }> | undefined> {
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

    const handlelookupMedicine = response.data[0].results.map((item) => {
      return {
        name: item.text,
        value: item.attributes[0].value,
      };
    }).slice(0, 10);

    console.log(`✅ FOI ENCONTRADO ${handlelookupMedicine.length} LINKS DO MEDICAMENTO: ${product?.toLocaleUpperCase()} \n`);

    return handlelookupMedicine;
  } catch (error) {
    console.error("Erro ao fazer scraping:", error);
  }
}