import puppeteer from "puppeteer";
import { ParameterFunctionScrapingMedicine } from "../../../types/functions/index.ts";
import configStore from "./config.ts";

export default async function ScrapingAraia({
  product,
}: ParameterFunctionScrapingMedicine) {
  const customUA = configStore.customUA;

  const browser = await puppeteer.launch({
    headless: configStore.headless,
    executablePath: configStore.executablePath,
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

  const page = await browser.newPage();
  await page.setUserAgent(customUA);
  await page.goto(`${configStore.webStore}${product}`);
  await page.waitForSelector(selectorLinksMedicine);

  const collectionLinksMedicine = await page.$$eval(
    selectorLinksMedicine,
    (el) => el.map((element) => element.href)
  );

  for (const linkMedicine of collectionLinksMedicine) {
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
        value: infoValueMedicine,
        description: infoDescriptionMedicine,
        images: infoImagesMedicine,
      });
    } catch (error) {
      await page.goto(linkMedicine);
      console.error("Medicine not found or frame was not found", error);
    }
  }
  await browser.close();
}
