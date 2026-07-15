import { sendWithTyping } from "../utils/sendWithTyping.js";

const opcoesAdvOf = {
  51: async (sock, jid) => {
    const texto = `⚖️ *ATENDIMENTO PRESENCIAL A ADVOGADOS E OFICIAIS DE JUSTIÇA:* 
    
O atendimento ocorre das *08h às 17h*.

🕒 *Horário de almoço:* das *11h às 13h*.  
Durante esse período, o atendimento poderá sofrer atrasos em razão das movimentações internas e revezamento da equipe.

📌 *Importante:* Somente serão atendidos advogados e oficiais de justiça com documentação regular.`;

    await sendWithTyping(sock, jid, texto);
  },

  52: async (sock, jid) => {
    const texto = `📞 *AGENDAMENTO DE TELEATENDIMENTO A ADVOGADOS:* 
    
Para realizar o agendamento, siga as instruções abaixo:

📧 Enviar e-mail para: *email@email.com* 🗂️ Arquivos devem estar em *PDF* (não envie links).  
📋 Utilize a planilha padrão do TJSP com a qualificativa do preso. No campo "observação", informe as *folhas a serem assinadas*.  
⏳ Aguarde a resposta com a data e hora do agendamento.

⚠️ *Observações Importantes:* - Os agendamentos serão realizados no *período da manhã* (à tarde, as salas são destinadas a teleaudiências dos Fóruns);  
- Enviar *cópia da OAB* e *Procuração*;  
- Limite de *05 presos por agendamento*;  
- Se não houver procuração assinada pelo preso, encaminhar o anexo para a *Supervisão da Unidade* no e-mail: *email@email.com* para orientações.`;

    await sendWithTyping(sock, jid, texto);
  },

  53: async (sock, jid) => {
    const texto = `📄 *BOLETINS, ATESTADOS E GRADES (ADVOGADOS):* 
    
Solicitações devem ser feitas por e-mail, com envio da *cópia da OAB* e *Procuração*.

📌 *Contatos específicos:* 

- *Boletim Informativo / Atestado de Conduta* (Setor SIMIC): *email@email.com* 
- *Atestados / Grade de Remição por Trabalho ou Estudo*: *email@email.com* 
- *Outras solicitações gerais*: *email@email.com*`;

    await sendWithTyping(sock, jid, texto);
  },
};

export default opcoesAdvOf;
