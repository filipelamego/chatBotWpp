// messageHandler.js
import { delay } from "./utils/delay.js";
import { sendWithTyping } from "./utils/sendWithTyping.js";

// Imports de States e Handlers
import {
  awaitingCPF,
  awaitingMatricula,
  awaitingEntrevista,
} from "./utils/state.js";
import {
  isGreeting,
  handleGreeting,
  getMenuPrincipal,
  handleMainMenu,
} from "./handlers/menu.js";
import {
  handleCPF,
  handleMatricula,
  handleEntrevista,
} from "./handlers/consulta.js";
import opcoesSeguranca from "./handlers/seguranca.js";
import opcoesPeculio from "./handlers/peculio.js";
import opcoesSIMIC from "./handlers/simic.js";
import opcoesCRAS from "./handlers/cras.js";
import opcoesAdvOf from "./handlers/advOf.js";

// Define o timestamp de início para ignorar mensagens enviadas enquanto o bot estava desligado
const botStartTime = Math.floor(Date.now() / 1000) - 60;
const usuariosProcessando = new Set();

// Gera um tempo de digitação aleatório entre 7 e 15 segundos para simular comportamento humano
const getRandomDelay = () =>
  Math.floor(Math.random() * (15000 - 7000 + 1)) + 7000;

/**
 * Manipulador principal de mensagens recebidas
 */
export async function handleMessages(sock, { messages }) {
  const msg = messages[0];
  
  // Ignora mensagens sem conteúdo ou enviadas pelo próprio bot
  if (!msg.message || msg.key.fromMe) return;

  // Evita falhas caso o stubType seja um evento técnico (ex: notificação de grupo, alteração de segurança)
  if (msg.messageStubType) return;

  const jid = msg.key.remoteJid;
  if (!jid) return;

  // Filtros de segurança: ignora mensagens antigas, grupos ou usuários já em processamento
  if (
    msg.messageTimestamp < botStartTime ||
    jid.includes("@g.us") ||
    usuariosProcessando.has(jid)
  ) {
    return;
  }

  // Bloqueia o JID para evitar concorrência/respostas duplicadas se o usuário mandar várias mensagens seguidas
  usuariosProcessando.add(jid);

  try {
    // Pequeno delay antes de marcar como lida
    await delay(2000);
    await sock.readMessages([msg.key]);

    // Extrai o texto limpo da mensagem (tratando mensagens efêmeras também)
    const content = msg.message.ephemeralMessage?.message || msg.message;
    const rawText =
      content.conversation || content.extendedTextMessage?.text || "";
    if (!rawText) return;

    const text = rawText.trim().toLowerCase();
    
    // Mostra no terminal para seu controle visual
    // console.log(`📩 Mensagem recebida de [${jid}]: "${rawText.trim()}"`);

    // Simula o tempo de digitação variável antes de responder
    await delay(getRandomDelay());

    // 1. Roteamento: Verificação de Saudações (Oi, Olá, etc.)
    if (isGreeting(text)) return await handleGreeting(sock, jid);
    
    // 2. Roteamento: Comando direto para voltar ao Menu Principal
    if (text === "menu")
      return await sendWithTyping(sock, jid, getMenuPrincipal());
      
    // 3. Roteamento: Opções numéricas do Menu Principal
    if (["1", "2", "3", "4", "5", "6"].includes(text))
      return await handleMainMenu(sock, jid, text);

    // 4. Roteamento: Submenus e opções específicas de cada departamento
    const handler =
      opcoesSeguranca[text] ||
      opcoesPeculio[text] ||
      opcoesSIMIC[text] ||
      opcoesCRAS[text] ||
      opcoesAdvOf[text];
    if (handler) return await handler(sock, jid);

    // 5. Roteamento: Captura de fluxos de dados/inputs específicos baseados no State do usuário
    if (awaitingCPF.has(jid) && /^\d{11}$/.test(text))
      return await handleCPF(sock, jid, text);
      
    if (awaitingMatricula.has(jid) && /^\d{5,10}$/.test(text))
      return await handleMatricula(sock, jid, text);
      
    if (awaitingEntrevista.has(jid))
      return await handleEntrevista(sock, jid, rawText.trim());

    // 6. Resposta padrão caso nenhuma das condições acima seja atendida
    await sendWithTyping(
      sock,
      jid,
      `❌ Não entendi sua mensagem.\nDigite *MENU* para visualizar as opções.\n\n_Este número não atende ligações via aplicativo nem processa arquivos de áudio._`,
    );
  } catch (error) {
    console.error(`[ERRO] Falha ao processar mensagem de ${jid}:`, error);
  } finally {
    // Libera o JID do usuário após 1.5s da finalização para que ele possa interagir novamente
    setTimeout(() => usuariosProcessando.delete(jid), 1500);
  }
}