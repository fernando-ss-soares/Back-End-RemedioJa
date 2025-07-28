const configStore = {
  headless: true,
  customUA:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  args: [
    "--no-sandbox", // Necessário ao rodar como root em ambientes Docker
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage", // Ajuda em ambientes com memória limitada
    "--disable-gpu",
    "--no-zygote",
  ],
  webStore: "https://www.drogaraia.com.br/search?w=",
  selectors: {
    list: "div.sc-b4b962d1-3.ihDJej.vertical > div > a",
    await: "main.sc-fb961b56-0.fxOotZ",
    title: "h1.sc-2aea4133-1.cbMvkL",
    value: "span.sc-fd6fe09f-0.jRRyrf.price-pdp-content",
    description: "div#product-details.sc-b66ae18c-0.kxeiwW",
    images: "a.gallery-item",
  },
  db: {
    connection: Deno.env.get("URI_DB") as string,
  },
};

export default configStore;
