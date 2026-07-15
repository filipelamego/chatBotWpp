import qrcode from "qrcode-terminal";
import pkg from "whatsapp-web.js";
import puppeteer from "puppeteer";

const { Client, LocalAuth, MessageMedia } = pkg;

export const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--no-first-run",
    ],
  },
  webVersionCache: {
    type: "remote",
    remotePath:
      "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.3000.1032570163-alpha.html",
  },
});

client.on("qr", (qr) => qrcode.generate(qr, { small: true }));
client.on("ready", async () => {
  console.log("🤖 WhatsApp conectado!");

  try {
    await client.pupPage.evaluate(() => {
      if (window.WWebJS && window.WWebJS.sendSeen) {
        window.WWebJS.sendSeen = () => {};
        console.log("sendSeen neutralizado");
      }
    });
  } catch (e) {
    console.error("Erro ao aplicar patch sendSeen", e);
  }
});

client.on("authenticated", () => {
  console.log("🔑 Autenticado com sucesso!");
});

client.on("auth_failure", (msg) => {
  console.error("❌ Falha na autenticação:", msg);
});

client.on("disconnected", (reason) => {
  console.log("⚠️ Desconectado:", reason);
});

// 👇 EXPORTA APENAS O QUE NÃO FOI EXPORTADO ANTES
export { MessageMedia };
