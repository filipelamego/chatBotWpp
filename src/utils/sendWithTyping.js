import { delay } from "./delay.js";

const calculateTypingTime = (message) => {
  const timePerChar = 60; // milissegundos por caractere
  let typingTime = message.length * timePerChar;
  typingTime = Math.max(typingTime, 2000); // no mínimo 2 segundos
  typingTime = Math.min(typingTime, 8000); // no máximo 8 segundos
  return typingTime;
};

// Agora a função recebe o 'sock' como primeiro parâmetro
export const sendWithTyping = async (sock, to, message) => {
  // Verificação básica de segurança
  if (!sock || !to || !message) return;

  const typingDelay = calculateTypingTime(message);

  try {
    // 1. Inicia o indicador "digitando..."
    await sock.sendPresenceUpdate("composing", to);

    // 2. Aguarda o tempo calculado (simulando escrita humana)
    await delay(typingDelay);

    // 3. Envia a mensagem de fato
    await sock.sendMessage(to, { text: message });

    // 4. Para o indicador de "digitando"
    await sock.sendPresenceUpdate("paused", to);
  } catch (err) {
    console.error("[SEND_WITH_TYPING ERROR]", err.message);

    // Fallback: tenta enviar sem o delay caso o presenceUpdate falhe
    try {
      await sock.sendMessage(to, { text: message });
    } catch (e) {
      console.error("[FALLBACK SEND ERROR]", e.message);
    }
  }
};
