import puppeteer from "puppeteer";
import mongoose from "mongoose";
import {
  ParameterFunctionFindLote,
  ParameterFunctionScrapingMedicine,
} from "../../../types/functions/medicine/index.ts";
import configStore from "./config.ts";
import MedicineSchema from "../../../models/schemas/medicine/index.ts";

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
  const customUA = configStore.customUA;

  // Conectando-se ao browserless via WebSocket
  const browser = await puppeteer.connect({
    browserWSEndpoint: configStore.browserlessWSEndpoint,
    acceptInsecureCerts: true
  });

  const selectorLinksMedicine = configStore.selectors.list;
  const selectorInfoMedicine = {
    await: configStore.selectors.await,
    title: configStore.selectors.title,
    value: configStore.selectors.value,
    description: configStore.selectors.description,
    images: configStore.selectors.images,
  };

  const collectionInfoMedicines = [];
  const collectionInfoMedcinesLote = crypto.randomUUID();

  const page = await browser.newPage();
  await page.setUserAgent(customUA);
  await page.goto(`${configStore.webStore}${product}`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector(selectorLinksMedicine, { timeout: 10000 });

  const collectionLinksMedicine = await page.$$eval(
    selectorLinksMedicine,
    (el) => el.map((element) => element.href)
  );

  for (const linkMedicine of collectionLinksMedicine.slice(0, 10)) {
    try {
      await page.goto(linkMedicine, { waitUntil: 'domcontentloaded' });

      await page.waitForSelector(selectorInfoMedicine.await);

      const infoTitleMedicine = await page.$eval(selectorInfoMedicine.title, el => el.textContent);
      const infoValueMedicine = await page.$eval(selectorInfoMedicine.value, el =>
        el.textContent?.substring(3).replace(",", ".")
      );
      const infoDescriptionMedicine = await page.$eval(selectorInfoMedicine.description, el => el.innerText);
      const infoImagesMedicine = await page.$$eval(selectorInfoMedicine.images, el =>
        el.map((element) => element.href)
      );

      collectionInfoMedicines.push({
        title: infoTitleMedicine,
        lote: collectionInfoMedcinesLote,
        value: infoValueMedicine,
        description: infoDescriptionMedicine,
        images: infoImagesMedicine,
        link: linkMedicine,
        search: product,
      });
    } catch (error) {
      console.error("Erro ao acessar o link do medicamento:", error);
    }
  }

  try {
    await mongoose.connect(configStore.db.connection);

    if (mongoose.connection.readyState) {
      const Medicine = await MedicineSchema.insertMany(collectionInfoMedicines);

      if (Medicine && Medicine.length > 0) {
        await mongoose.disconnect();
        await browser.disconnect();
        return {
          lote: collectionInfoMedcinesLote,
        };
      }
    }

    await mongoose.disconnect();
    await browser.disconnect();
  } catch (error) {
    console.error("Erro ao salvar no banco:", error);
    await mongoose.disconnect();
    await browser.disconnect();
  }

  await browser.disconnect();
  return { lote: null };
}