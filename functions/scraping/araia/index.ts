import puppeteer from "puppeteer";
import mongoose from "mongoose";
import {
  ParameterFunctionFindLote,
  ParameterFunctionScrapingMedicine,
} from "../../../types/functions/index.ts";
import configStore from "./config.ts";
import MedicineSchema from "../../../model/schemas/index.ts";

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

  const browser = await puppeteer.launch({
    headless: configStore.headless,
    executablePath: configStore.executablePath,
    args: configStore.args
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
  await page.goto(`${configStore.webStore}${product}`);
  await page.waitForSelector(selectorLinksMedicine, { timeout: 10000 });

  const collectionLinksMedicine = await page.$$eval(
    selectorLinksMedicine,
    (el) => el.map((element) => element.href)
  );

  for (const linkMedicine of collectionLinksMedicine.slice(0,10)) {
    try {
      await page.goto(linkMedicine);

      await page.waitForSelector(selectorInfoMedicine.await);

      const infoTitleMedicine = (await page.$eval(
        selectorInfoMedicine.title,
        (el) => el.textContent
      )) as string;
      const infoValueMedicine = (await page.$eval(
        selectorInfoMedicine.value,
        (el) => el.textContent.substring(3, el.length).replace(",", ".")
      )) as string;
      const infoDescriptionMedicine = (await page.$eval(
        selectorInfoMedicine.description,
        (el) => el.innerText
      )) as string;
      const infoImagesMedicine = (await page.$$eval(
        selectorInfoMedicine.images,
        (el) => el.map((element) => element.href)
      )) as string[];

      collectionInfoMedicines.push({
        title: infoTitleMedicine,
        lote: collectionInfoMedcinesLote,
        value: infoValueMedicine,
        description: infoDescriptionMedicine,
        images: infoImagesMedicine,
        link: linkMedicine,
        search: product
      });
    } catch (error) {
      await page.goto(linkMedicine);
      console.error("Medicine not found or frame was not found", error);
    }
  }

  try {
    await mongoose.connect(configStore.db.connection);

    if (mongoose.connection.readyState) {
      const Medicine = await MedicineSchema.insertMany(collectionInfoMedicines);

      if (Medicine && Medicine.length > 0) {
        await mongoose.disconnect();
        await browser.close();
        return {
          lote: collectionInfoMedcinesLote,
        };
      }
    }

    await mongoose.disconnect();
    await browser.close();
  } catch (error) {
    console.error(
      "Medicine not was insert medicines in database. Please try again more late",
      error
    );
    await mongoose.disconnect();
    await browser.close();
  }

  await browser.close();

  return {
    lote: null,
  };
}
