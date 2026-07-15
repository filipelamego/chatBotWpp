import fs from "fs";
import path from "path";
import { sendWithTyping } from "../utils/sendWithTyping.js";
import { awaitingEntrevista } from "../utils/state.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const opcoesSeguranca = {
  // Alterado para receber (sock, jid)
  10: async (sock, jid) => {
    const mediaPath = path.join(
      __dirname,
      "..",
      "..",
      "docs",
      "calendario_visita.pdf",
    );

    await sendWithTyping(sock, jid, "📄 *CALENDÁRIO DE VISITAÇÃO:*");

    await sock.sendMessage(jid, {
      document: fs.readFileSync(mediaPath),
      mimetype: "application/pdf",
      fileName: "calendario_visita.pdf",
    });
  },

  11: async (sock, jid) => {
    const texto = `📌 *Conforme Resolução SAP vigente, as regras sobre vestimentas são:*

📖 *Artigo 115* – Para ingresso em estabelecimento penal, todos os visitantes, inclusive crianças e adolescentes, deverão observar os seguintes critérios quanto ao vestuário:

I - Uso de camisetas com manga (curta ou longa), *exceto* nas cores: azul marinho, branca, caqui/marrom e preta.  
II – Uso de calça de moletom ou legging, *sem botões metálicos, sem zíper e sem estampas*, exceto nas cores acima.  
III – Visitantes do sexo feminino também podem usar *saias tipo “midi”* (abaixo dos joelhos).  
IV – Uso de *chinelo de dedo*, com solado fino e alças de borracha simples.  
V – Em dias frios, é permitido o uso de *meias e blusa de moletom*, desde que *sem capuz, forro, bolsos, botões metálicos ou zíper*, e respeitando as cores permitidas.

🚫 *Artigo 115-A* – É *proibido* à pessoa privada de liberdade *trocar ou emprestar roupas e/ou pertences com visitantes*.`;

    await sendWithTyping(sock, jid, texto);
  },

  12: async (sock, jid) => {
    const mensagens = [
      `📄 *DOCUMENTOS PARA PAI, MÃE, IRMÃOS, FILHOS E NETOS*
- Cópia autenticada RG, CPF ou CNH (cópia do original, não pode ser do digital)
- Antecedentes criminais (apenas para maiores de 18 anos)
- Comprovante de endereço (Conta de água, energia, telefone fixo, internet residencial, gás encanado ou TV a cabo. Caso não esteja no nome da visitante, deverá acompanhar declaração de residência, devidamente assinada pelo proprietário do imóvel, com firma reconhecida em cartório, ou certidão de casamento.)
- Cópia do documento do preso
- 2 fotos 3x4`,

      `📄 *DOCUMENTOS PARA ESPOSA OU AMÁSIA*
- Cópia autenticada RG, CPF ou CNH (cópia do original, não pode ser do digital)
- Antecedentes criminais
- Comprovante de endereço (Conta de água, energia, telefone fixo, internet residencial, gás encanado ou TV a cabo. Caso não esteja no nome da visitante, deverá acompanhar declaração de residência, devidamente assinada pelo proprietário do imóvel, com firma reconhecida em cartório, ou certidão de casamento.)
- Declaração de amásia ou certidão de casamento (Declaração de amásia deve estar assinada pela visitante e mais duas testemunhas, com firma reconhecida em cartório)
- Certidão de nascimento do filho
- 2 fotos 3x4`,

      `📄 *DOCUMENTOS PARA AVÓS*
- Cópia autenticada RG, CPF ou CNH (cópia do original, não pode ser do digital)
- Antecedentes criminais
- Comprovante de endereço (Conta de água, energia, telefone fixo, internet residencial, gás encanado ou TV a cabo. Caso não esteja no nome da visitante, deverá acompanhar declaração de residência, devidamente assinada pelo proprietário do imóvel, com firma reconhecida em cartório, ou certidão de casamento.)
- Cópia da certidão de nascimento do preso (obrigatório)
- 2 fotos 3x4`,

      `📄 *DOCUMENTOS PARA VISITA ÚNICA*
- Cópia autenticada RG, CPF ou CNH (cópia do original, não pode ser do digital)
- Antecedentes criminais
- Comprovante de endereço (Conta de água, energia, telefone fixo, internet residencial, gás encanado ou TV a cabo. Caso não esteja no nome da visitante, deverá acompanhar declaração de residência, devidamente assinada pelo proprietário do imóvel, com firma reconhecida em cartório, ou certidão de casamento.)
- Cópia da certidão de nascimento do preso (no caso de tios ou primos)
- 2 fotos 3x4`,

      `🤰 *GESTANTES*: devem enviar a cópia da carteirinha de gestante, onde conste o nome e a data prevista do parto.`,

      `📝 *ENTREVISTAS* - *Amásias* que *NÃO* possuam filho(a) com o detento  
- *Visitas únicas sem parentesco* ➡️ Deverão *obrigatoriamente* realizar entrevista para *convalidação de vínculo*.  

📲 A entrevista deve ser agendada diretamente no *autoatendimento do WhatsApp*, após o envio da documentação e liberação pelo setor de Rol de Visitas.`,

      `📬 *ENDEREÇO PARA ENVIO DA DOCUMENTAÇÃO*:  
Rol de Visitas - CDP de Sorocaba  
Av. Drº Antonio de Souza Neto, Nº 300  
Aparecidinha – Sorocaba – SP  
CEP: 18087-210`,

      `📌 *IMPORTANTE:* 📅 Aguardar no mínimo *10 dias* após o envio.`,
    ];

    for (const texto of mensagens) {
      await sendWithTyping(sock, jid, texto);
    }
  },

  13: async (sock, jid) => {
    const mediaPath = path.join(
      __dirname,
      "..",
      "..",
      "docs",
      "Lista_Sedex.pdf",
    );

    await sendWithTyping(
      sock,
      jid,
      `📄 *SEDEX E CARTAS* 
Segue o arquivo PDF contendo todas as orientações sobre os itens referentes aos produtos que podem ser enviados via SEDEX.

📦 *Importante:* 
• É permitida o envio de *01 (uma) caixa por semana*, com *tamanho máximo 05*.  
• Podem enviar Sedex *somente pessoas devidamente cadastradas no ROL DE VISITAS do detento*.  
• ❌ Produtos fora dos padrões estipulados *não terão sua entrada permitida*.  
• ⚠️ Visitantes que trouxerem o jumbo completo durante os finais de semana *não poderão enviar SEDEX* naquela mesma semana.

📬 *Atenção:* Telegramas e/ou cartas registradas *somente poderão ser enviados por pessoas devidamente cadastradas no ROL DE VISITAS do detento.*`,
    );

    await sock.sendMessage(jid, {
      document: fs.readFileSync(mediaPath),
      mimetype: "application/pdf",
      fileName: "Lista_Sedex.pdf",
    });
  },

  14: async (sock, jid) => {
    await sendWithTyping(
      sock,
      jid,
      `🗓️ *AGENDAMENTO DE ENTREVISTAS:*

❗❗LEIA COM ATENÇÃO!

Conforme Art. 103 da resolução SAP 144, os(as) visitantes, exceto parentes até 2º grau, serão submetidos a entrevista pela área de Segurança e Disciplina da Unidade, devendo realizar prévio agendamento para o dia pretendido.

As entrevistas serão realizadas entre segunda e quarta-feira, exceto feriados, das 08h00 às 11h00, limitando-se a 3 (três) entrevistas por dia.

As entrevistas ocorrerão por ordem de chegada.

O agendamento deverá ser realizado com antecedência mínima de 72 horas, através do autoatendimento no WhatsApp da unidade prisional.

A data informada deverá estar no formato DD/MM/AAAA (Ex: 04/08/2025) e deve ser uma segunda, terça ou quarta-feira.

Ao realizar o agendamento, o(a) visitante deve estar ciente de que a entrevista será realizada exclusivamente dentro do período informado, não sendo possível agendar entrevistas para outros dias ou horários.`,
    );

    await sendWithTyping(
      sock,
      jid,
      "Informe o CPF do visitante para iniciar o agendamento, somente números:",
    );

    awaitingEntrevista.set(jid, { etapa: "cpf" });
  },

  15: async (sock, jid) => {
    const mediaPath = path.join(
      __dirname,
      "..",
      "..",
      "docs",
      "Listagem_Jumbo.pdf",
    );

    await sendWithTyping(
      sock,
      jid,
      `📄 *LISTA DE JUMBO*

🧺 *Confira as regras e os itens permitidos para os dias de visitação.*

📌 Todos os itens seguem a *Resolução SAP nº 130, de 14/10/2022.*`,
    );

    await sock.sendMessage(jid, {
      document: fs.readFileSync(mediaPath),
      mimetype: "application/pdf",
      fileName: "Listagem_Jumbo.pdf",
    });
  },

  16: async (sock, jid) => {
    await sendWithTyping(
      sock,
      jid,
      `📬 *CONEXÃO FAMILIAR*

📌 *Nova regra sobre CORRESPONDÊNCIAS VIRTUAIS:*

✉️ *Troca de Mensagens Eletrônicas:* 
- Será permitido envio de *01 (uma)* mensagem (e-mail) por mês.  
- O/A visitante receberá por e-mail a confirmação da entrega da mensagem para o reeducando.

⚠️ *NÃO HAVERÁ OUTRA RESPOSTA*, apenas a confirmação de entrega da mensagem.

🔗 Para mais informações sobre o programa Conexão Familiar, acesse:  
https://www1.sap.sp.gov.br/conexao-familiar.html#top`,
    );
  },
};

export default opcoesSeguranca;
