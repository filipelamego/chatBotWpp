import { sendWithTyping } from "../utils/sendWithTyping.js";

const opcoesCRAS = {
  // Adicionado 'sock' como primeiro parâmetro
  41: async (sock, jid) => {
    const texto = `👶 *ORIENTAÇÕES PARA RECONHECIMENTO DE PATERNIDADE (RECÉM-NASCIDOS OU JÁ REGISTRADOS):*

📌 *Recém-nascido (registro ainda não feito)* 
Encaminhar para o e-mail *reintegracao@p2sorocaba.sap.sp.gov.br* os seguintes documentos:
 
- Declaração de nascido vivo (folha amarela);  
- RG da mãe;  
- RG do pai (se tiver);  
- Comprovante de endereço em nome da mãe (ou declaração de endereço);  
- Nome que a criança irá se chamar;  
- Nome e matrícula do sentenciado.

Após o envio, será confeccionada uma declaração a ser levada ao cartório. O documento deverá ser retirado na unidade.

📌 *Criança já registrada apenas pela mãe* 
Encaminhar para o e-mail *emailteste@email* os seguintes documentos:

- Certidão de nascimento da criança;  
- RG da mãe;  
- RG do pai (se tiver);  
- Comprovante de endereço em nome da mãe (ou declaração de endereço);  
- Nome que a criança passará a se chamar;  
- Nome e matrícula do sentenciado.`;

    await sendWithTyping(sock, jid, texto);
  },

  42: async (sock, jid) => {
    const texto = `🪦 *ÓBITOS FAMILIARES:*

Deverá encaminhar e-mail para *emailteste@email* com os seguintes dados: 

- Nome e matrícula do detento;
- Certidão ou declaração de óbito;  
- Data, local e horário do féretro e sepultamento;  
- Telefone da funerária responsável.

📌 Após verificação da veracidade, o sentenciado será informado.

🔖 *Conforme Art. 120 da Lei nº 7.210/84 (Lei de Execução Penal):* 
Poderá haver saída do sentenciado, *mediante disponibilidade de escolta ou autorização judicial*, nos casos de falecimento de:

- Cônjuge ou companheira(o);  
- Ascendente (pai, mãe, avós);  
- Descendente (filhos, netos);  
- Irmãos.`;

    await sendWithTyping(sock, jid, texto);
  },

  43: async (sock, jid) => {
    const texto = `🧠 *ASSISTÊNCIA SOCIAL / PSICOLOGIA:*

Em caso de dúvidas ou necessidade de atendimento, encaminhar e-mail para:  
📧 *emailteste@email*`;

    await sendWithTyping(sock, jid, texto);
  },
};

export default opcoesCRAS;
