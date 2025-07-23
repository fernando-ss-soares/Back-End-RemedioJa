FROM debian:bullseye-slim

# Instalar dependências
RUN apt-get update && apt-get install -y \
    curl \
    unzip \
    gnupg \
    ca-certificates \
    fonts-liberation \
    libatk-bridge2.0-0 \
    libnspr4 \
    libnss3 \
    libxss1 \
    libasound2 \
    libxshmfence-dev \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxi6 \
    libxtst6 \
    libappindicator3-1 \
    libjpeg-dev \
    && rm -rf /var/lib/apt/lists/*

# Instalar o Deno
RUN curl -fsSL https://deno.land/install.sh | sh

# Adicionar Deno ao PATH
ENV DENO_INSTALL="/root/.deno"
ENV PATH="${DENO_INSTALL}/bin:${PATH}"


# Instala dependências do Chrome
RUN apt-get update && apt-get install -y \
    wget \
    curl \
    gnupg \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libgbm1 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libxss1 \
    libx11-xcb1 \
    xdg-utils

# Instala o Chrome
RUN curl -LO https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    apt-get install -y ./google-chrome-stable_current_amd64.deb && \
    rm google-chrome-stable_current_amd64.deb

WORKDIR /app
COPY . /app

EXPOSE 9558

CMD ["deno", "run", "--allow-scripts", "--node-modules-dir=auto", "--allow-sys", "--allow-env", "--allow-net", "--allow-read", "--allow-write", "--allow-run", "main.ts"]
