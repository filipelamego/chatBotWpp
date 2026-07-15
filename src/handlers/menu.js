import { sendWithTyping } from "../utils/sendWithTyping.js";

export const getMenuPrincipal = () =>
  `📋 *MENU PRINCIPAL - Digite o número da opção desejada:*

1 - 👥 *Visitantes* (Documentações / Entrevista)
2 - 💰 *Pecúlio* (Depósitos / Retiradas / Compras)  
3 - 📄 *SIMIC* (Saída Temporária / Auxílio Reclusão)  
4 - 📝 *CRAS* (Registros de Paternidade / Óbitos)  
5 - ⚖️ *Advogados e Oficiais de Justiça* 
6 - 📞 *Telefones Úteis e Endereço*

ℹ️ Digite "menu" para voltar aqui a qualquer momento.
`;

export const isGreeting = (text) => {
  const normalized = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return /\b(dia|tarde|noite|oi|ola|preciso|informacao|ajuda)\b/i.test(
    normalized,
  );
};

// Ajustado para receber sock e jid
export const handleGreeting = async (sock, jid) => {
  await sendWithTyping(
    sock,
    jid,
    `Olá! 👋 
Este é o Assistente Virtual do CDP Sorocaba.

❗ ATENÇÃO: Este é um canal de consulta automática. Suas mensagens não são lidas por um funcionário.

Por favor, não ligue via WhatsApp e não envie áudios, fotos ou perguntas. Digite apenas os números das opções.

Para consultar a localização de um detento, utilize a ferramenta "Paradeiro", fornecida pela Secretaria de Administração Penitenciária (SAP):

https://portal.sap.sp.gov.br/formularios/paradeiro
`,
  );

  await sendWithTyping(sock, jid, getMenuPrincipal());
};

// Ajustado para receber sock, jid e a opção
export const handleMainMenu = async (sock, jid, option) => {
  switch (option) {
    case "1":
      await sendWithTyping(
        sock,
        jid,
        `👥 *VISITANTES - Digite o número da opção desejada:*

10 - 📅 Calendário de Visitação  
11 - 👕 Vestuário para Visitantes  
12 - 🧾 Cadastro de Visitantes  
13 - 📩 Sedex e Cartas  
14 - 📋 Agendamento de Entrevista  
15 - 📦 Lista de Jumbo  
16 - 📞 Conexão Familiar`,
      );
      break;

    case "2":
      await sendWithTyping(
        sock,
        jid,
        `💰 *PECÚLIO - Digite o número da opção desejada:* 
        
21 - 🧾 Depósito do Reeducando para Familiar  
22 - 🏛️ Retirada de Valores na Unidade Prisional (Pós Liberdade)  
23 - 🏦 Receber Depósito em Banco (Pós Liberdade)  
24 - 💳 Depósito via PIX  
25 - 🛒 Compras via Pecúlio  
26 - 🪪 Retirada de Documentos e/ou Objetos de Valor`,
      );
      break;

    case "3":
      await sendWithTyping(
        sock,
        jid,
        `📑 *SIMIC - Digite o número da opção desejada:*

31 - 🏃‍♂️ Saída Temporária  
32 - 💰 Auxílio Reclusão (INSS)`,
      );
      break;

    case "4":
      await sendWithTyping(
        sock,
        jid,
        `🏢 *CRAS - Digite o número da opção desejada:* 

41 - 👶 Reconhecimento de Paternidade  
42 - 🪦 Óbitos Familiares  
43 - 🧠 Assistência Social / Psicologia`,
      );
      break;

    case "5":
      await sendWithTyping(
        sock,
        jid,
        `⚖️ *ADVOGADOS E OFICIAIS DE JUSTIÇA - Digite o número da opção desejada:* 
        
51 - 🏢 Atendimento Presencial  
52 - 📞 Agendamento de Teleatendimento  
53 - 📄 Boletins, Atestados e Grades`,
      );
      break;

    case "6":
      await sendWithTyping(
        sock,
        jid,
        `📞 *TELEFONES E ENDEREÇO*

Telefone Principal: (15) 3335-2303  

📧 E-mails:  
• Pecúlio: peculio@email.com  
• Assistente Social: email@email.com 
• SIMIC: email@email.com 

📍 Endereço:  
Endereço Prisional, 300  
Aparecidinha - CEP 18.087-210 - Sorocaba/SP`,
      );
      break;
  }
};
