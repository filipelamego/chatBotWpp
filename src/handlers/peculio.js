import { sendWithTyping } from "../utils/sendWithTyping.js";

const opcoesPeculio = {
  21: async (sock, jid) => {
    const texto = `💰 *DEPÓSITO DO SENTENCIADO PARA FAMILIAR:* 

O sentenciado deverá encaminhar solicitação ao Setor de Pecúlio, para que seja efetuado depósito em favor de familiar cadastrado no ROL DE VISITAS, devendo ser fornecido dados completos bancários do favorecido, tais como: nome completo, CPF, nº de agência e conta (corrente ou poupança) e valor.

⚠️ *Atenção:* - Só será permitido o depósito em conta corrente ou poupança do Banco do Brasil (banco vinculado para transações bancárias com a SAP).`;

    await sendWithTyping(sock, jid, texto);
  },

  22: async (sock, jid) => {
    const texto = `🏦 *RETIRADA DE VALORES NA UNIDADE PRISIONAL (PÓS LIBERDADE):* 

“Para os casos em que os sentenciados foram beneficiados pela progressão de regime ou cumprimento de pena, antes do pagamento da empresa, e possuem condições de receber os valores de forma presencial.”

📋 *Procedimento para retirada:* 

- Cópia do Alvará de Soltura + original;
- Cópia do RG + original;  
- Entrar em contato com o Setor de Pecúlio via e-mail: *peculio@cdpsor.sap.sp.gov.br* ou telefone *(15) 3335-2303 – Opção 2*, para agendamento da data para retirada na Unidade Prisional.`;

    await sendWithTyping(sock, jid, texto);
  },

  23: async (sock, jid) => {
    const texto = `🏦 *RECEBER DEPÓSITO EM BANCO (PÓS LIBERDADE):* 
    
“Para os casos em que os sentenciados foram beneficiados pela progressão de regime ou cumprimento de pena, antes do pagamento da empresa, e não possuem condições de receber os valores de forma presencial.”

📋 *Procedimento via e-mail (email@email.com):* 

- Encaminhar cópia do RG;
- Encaminhar cópia do Alvará de Soltura;  
- Encaminhar cópia do Cartão ou Extrato da conta, onde conste o banco, agência e conta a ser depositada;  
- Se a conta for de Terceiro, ela deve constar no ROL DE VISITAS, com documentação em ordem.  
- No e-mail, mencionar: nome, RG, CPF e dados bancários completos do titular da conta.`;

    await sendWithTyping(sock, jid, texto);
  },

  24: async (sock, jid) => {
    const texto = `💸 *DEPÓSITO NO PECÚLIO POR PIX* 
    
Conforme Resolução SAP 56, de 02 de junho de 2022:

✔️ Permitido somente *01 depósito mensal* por pessoa privada de liberdade;  
✔️ Valor máximo permitido: *01 salário mínimo vigente*;  
✔️ Somente visitantes cadastrados e maiores de 16 anos podem realizar ou receber depósitos;  
✔️ Movimentação de valores deve ser feita com conta em nome do visitante cadastrado;  
✔️ O depósito *deve conter o nome e matrícula da pessoa privada de liberdade* no campo "descrição";  
✔️ Despesas com restituições por descumprimento das regras serão debitadas da transação.

🔑 *Chave PIX*: pixcdpsorocaba@sap.sp.gov.br`;

    await sendWithTyping(sock, jid, texto);
  },

  25: async (sock, jid) => {
    const texto = `🛒 *COMPRAS VIA PECÚLIO*

🗓️ As compras são realizadas *uma vez por mês*, com base no saldo disponível na conta pecúlio do sentenciado.

📝 Uma folha de compras é encaminhada *todo dia 10* para que o detento possa selecionar os itens que deseja adquirir.

💸 *Atenção:* Para que o valor esteja disponível, os depósitos via *PIX* devem ser realizados *antes do dia 10 de cada mês*.

📌 Os itens são limitados ao saldo e às normas da unidade.`;

    await sendWithTyping(sock, jid, texto);
  },

  26: async (sock, jid) => {
    const texto = `🪪 *Retirada de Documentos e/ou Objetos de Valor*

A retirada de documentos e/ou objetos de valor deve ser realizada às *quintas-feiras*, no horário das *8h às 12h*.

Quaisquer dúvidas, entrar em contato diretamente com o setor de pecúlio via *telefone: (15) XXXXXXX, ramal XXX*`;

    await sendWithTyping(sock, jid, texto);
  },
};

export default opcoesPeculio;
