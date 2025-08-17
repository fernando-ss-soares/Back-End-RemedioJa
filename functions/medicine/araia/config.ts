const configStore = {
  headless: true,
  browserlessWSEndpoint: "wss://labs.beepcore.com.br?token=Y6zoj7a2M3QkvCbOXwNKaVoSEDw2ReBb",
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
    list: "div.sc-c27b45ec-9.cEyotn > article > div > *.vertical > a",
    await: "main.sc-fb961b56-0.fxOotZ",
    title: "h1.sc-2aea4133-1.cbMvkL",
    value: "#pdp-price-with-select-wrapper > div > span",
    description: "div#product-details.sc-b66ae18c-0.kxeiwW",
    images: "img.main.image",
  },
  db: {
    connection: Deno.env.get("URI_DB") as string,
  },
};

export default configStore;
