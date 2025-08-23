const configStore = {
  headless: true,
  browserlessWSEndpoint: "wss://labs.beepcore.com.br?token=Y6zoj7a2M3QkvCbOXwNKaVoSEDw2ReBb",
  customUA:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/567.86 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/567.86",
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  args: [
    "--no-sandbox", // Necessário ao rodar como root em ambientes Docker
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage", // Ajuda em ambientes com memória limitada
    "--disable-gpu",
    "--no-zygote",
  ],
  webStore: "https://www.drogaraia.com.br/search?w=",
  webStoreProduct: "https://www.drogaraia.com.br",
  selectors: {
    list: "div.sc-ec7f6f0d-5.bgEOVl.vertical > div > h2 > a",
    await: "main.sc-fb961b56-0.fxOotZ",
    title: "h1.sc-2aea4133-1.cbMvkL",
    value: "span.sc-fd6fe09f-0.jRRyrf.price-pdp-content",
    description: "div#product-details.sc-b66ae18c-0.kxeiwW",
    images: "div.thumbnail-gallery-container > div.thumbnail-gallery > div.thumbnails > a",
  },
  db: {
    connection: Deno.env.get("URI_DB") as string,
  },
};

export default configStore;