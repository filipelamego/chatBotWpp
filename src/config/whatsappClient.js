import P from "pino";
import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
} from "@whiskeysockets/baileys";
import { Boom } from "@hapi/boom";
import qrcode from "qrcode-terminal";

// Importa o manipulador de mensagens que você criou
import { handleMessages } from "../messageHandler.js";

let sock;
let isConnecting = false;

export async function startWhatsApp() {
  if (isConnecting) return;
  isConnecting = true;

  const { state, saveCreds } = await useMultiFileAuthState("baileys_auth");
  const { version } = await fetchLatestBaileysVersion();

  console.log(`🚀 Iniciando socket com WA v${version.join(".")}`);

  sock = makeWASocket({
    version,
    auth: state,
    logger: P({ level: "error" }),
    generateHighQualityLinkPreview: true,
    browser: ["Ubuntu", "Chrome", "120.0.0.0"],
    connectTimeoutMs: 60000,
    keepAliveIntervalMs: 30000,
  });

  // Vincula a atualização automática de credenciais (sessão)
  sock.ev.on("creds.update", saveCreds);

  // OUVINTE DE MENSAGENS: Vinculado diretamente à instância viva do socket
  sock.ev.on("messages.upsert", async (m) => {
    // 'notify' garante que estamos ouvindo mensagens novas recebidas em tempo real
    if (m.type === "notify") {
      await handleMessages(sock, m);
    }
  });

  // Gerenciamento do status da conexão
  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect, qr } = update;

    // Exibe o QR Code se a sessão não estiver conectada
    if (qr) {
      console.log("📱 Escaneie o QR Code abaixo para conectar:");
      qrcode.generate(qr, { small: true });
    }

    if (connection === "open") {
      console.log("🤖 WhatsApp conectado com sucesso!");
      console.log("✅ Bot de atendimento ativo e aguardando mensagens...");
      isConnecting = false;
    }

    if (connection === "close") {
      const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
      isConnecting = false;

      if (reason === DisconnectReason.loggedOut) {
        console.log(
          "❌ WhatsApp deslogado. Delete a pasta 'baileys_auth' e escaneie o QR Code novamente.",
        );
      } else {
        // Delay de 10 segundos padrão para evitar loops de reconexão agressivos (Erro 440)
        console.log(
          `⚠️ Conexão perdida (Razão: ${reason}). Reconectando em 10s...`,
        );
        setTimeout(() => startWhatsApp(), 10000);
      }
    }
  });
}
