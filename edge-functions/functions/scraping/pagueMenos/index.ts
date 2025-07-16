import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";
import { ParameterFunctionScrapingMedicine } from "../../../types/functions/index.ts";

export default async function ScrapingPagueMenos({ store }: ParameterFunctionScrapingMedicine) {
  const browser = await puppeteer.launch({ headless: true, executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
  const page = await browser.newPage();
  await page.goto("https://www.google.com");
  await page.screenshot({ path: "example.png" });
  await browser.close();

  return true;
}
