import pool from "../config/db.js";
import { sendWithTyping } from "../utils/sendWithTyping.js";
import {
  awaitingCPF,
  awaitingMatricula,
  awaitingEntrevista,
} from "../utils/state.js";
import nodemailer from "nodemailer";

// EMAIL
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: { rejectUnauthorized: false },
});

async function enviarEmailAgendamento(dados) {
  try {
    await transporter.sendMail({
      from: `"Departamento de Tecnologia da Informação" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO_ROL,
      cc: process.env.EMAIL_CC_DCSD,
      subject: "Notificação de Agendamento de Entrevista via Bot WhatsApp",
      html: `
        <p>Prezado(a),</p>
        <p>📌 Um(a) visitante agendou uma entrevista via WhatsApp:</p>
        <ul>
          <li>👤 Visitante: <strong>${dados.nome}</strong></li>
          <li>🪪 CPF: <strong>${dados.cpf}</strong></li>
          <li>📅 Data: <strong>${dados.data}</strong></li>
        </ul>
        <p>Não se esqueça de imprimir os formulários de entrevista no sistema <strong>SISGEP</strong>.</p><br>
        <p>Atenciosamente,<br>
        <strong>Departamento de Tecnologia da Informação - CDP Sorocaba</strong></p><br>
        <p><em>Atenção: Este é um e-mail automático. Não responda.</em></p>
      `,
    });
    console.log("📩 Email de agendamento enviado!");
  } catch (err) {
    console.error("❌ Erro ao enviar email:", err);
  }
}

// CPF
export const handleCPF = async (sock, from, messageBody) => {
  awaitingCPF.delete(from);

  try {
    const [rows] = await pool.execute(
      `SELECT Nome_Visi 
       FROM visitantes_cad 
       WHERE Cpf_Visi = ?
         AND AUTORIZA = 'A'
         AND Status_Visi = 'A'
       LIMIT 1`,
      [messageBody.trim()],
    );

    if (rows.length > 0) {
      await sendWithTyping(
        sock,
        from,
        `✅ *Carteirinha encontrada!*
📄 *Situação:* Emitida e autorizada para visitação.`,
      );
    } else {
      await sendWithTyping(
        sock,
        from,
        `⚠️ *Nenhuma carteirinha emitida para este CPF.* Verifique se o cadastro foi realizado corretamente ou aguarde a liberação.`,
      );
    }
  } catch (err) {
    console.error("Erro ao consultar carteirinha:", err);
    await sendWithTyping(
      sock,
      from,
      "❌ Ocorreu um erro ao consultar a carteirinha. Tente novamente mais tarde.",
    );
  }
};

// MATRÍCULA
export const handleMatricula = async (sock, from, messageBody) => {
  awaitingMatricula.delete(from);

  try {
    const matricula = messageBody.trim();

    const [rows] = await pool.execute(
      `SELECT Pav_Cel, Cela_Cel 
       FROM celas 
       WHERE LEFT(Matric_Cel, LENGTH(Matric_Cel) - 1) = ?
         AND Dl_Cel = '+'
         AND Fim_Cel IS NULL
       LIMIT 1`,
      [matricula],
    );

    if (rows.length > 0) {
      const preso = rows[0];

      await sendWithTyping(
        sock,
        from,
        `✅ *Detento encontrado:* 📌 *Ala:* ${preso.Pav_Cel}  
📌 *Cela:* ${preso.Cela_Cel}`,
      );
      return;
    }

    const [transferido] = await pool.execute(
      `SELECT Proc_Destino_Mov
       FROM mov_sent
       WHERE LEFT(Matric_Mov, LENGTH(Matric_Mov) - 1) = ?
         AND Tipo_Mov = 'ER'
       ORDER BY Data_Out_Mov DESC
       LIMIT 1`,
      [matricula],
    );

    if (transferido.length > 0) {
      await sendWithTyping(
        sock,
        from,
        `⚠️ *Sentenciado transferido.* Destino: *${transferido[0].Proc_Destino_Mov}*`,
      );
      return;
    }

    await sendWithTyping(
      sock,
      from,
      `⚠️ *Detento não encontrado na unidade.* Verifique a matrícula ou possível transferência.`,
    );
  } catch (err) {
    console.error("Erro ao consultar detento:", err);
    await sendWithTyping(
      sock,
      from,
      "❌ Ocorreu um erro ao consultar o detento. Tente novamente mais tarde.",
    );
  }
};

// ENTREVISTA
export const handleEntrevista = async (sock, from, messageBody) => {
  try {
    const estado = awaitingEntrevista.get(from);
    if (!estado) return;

    // ETAPA CPF
    if (estado.etapa === "cpf") {
      const cpfRecebido = messageBody.trim();

      if (!/^\d{11}$/.test(cpfRecebido)) {
        awaitingEntrevista.set(from, { etapa: "cpf" });
        await sendWithTyping(
          sock,
          from,
          "⚠️ CPF inválido. Digite apenas os 11 números:",
        );
        return;
      }

      // Consulta se o campo "Agendar Entrevista" está marcado como true
      const [aptidao] = await pool.execute(
        `SELECT Nome_Visi 
         FROM visitantes_cad 
         WHERE Cpf_Visi = ? AND agendamento = true 
         LIMIT 1`,
        [cpfRecebido],
      );

      // Consulta se já há data de entrevista agendada na tabela "entrevista"
      const[agendamento] = await pool.execute(
        `SELECT visitante_cpf
         FROM entrevista
         WHERE visitante_cpf = ?`,
        [cpfRecebido],
      );

      // Libera o agendamento apenas se não houver outra data na tabela
      if (aptidao.length > 0 && agendamento.length === 0) {
        const nome = aptidao[0].Nome_Visi ?? "Visitante";
        awaitingEntrevista.set(from, { etapa: "data", cpf: cpfRecebido });

        await sendWithTyping(
          sock,
          from,
          `✅ *Acesso liberado para agendamento!* 👤 *Nome:* ${nome}  

Informe a data desejada (DD/MM/AAAA):`,
        );
        return;
      }

      const [agendamentoExistente] = await pool.execute(
        `SELECT MAX(data_entrevista) AS data_entrevista
         FROM entrevista 
         WHERE visitante_cpf = ?
         LIMIT 1`,
        [cpfRecebido],
      );

      if (agendamentoExistente[0]?.data_entrevista) {
        const d = agendamentoExistente[0].data_entrevista;
        const dataFormatada =
          `${String(d.getDate()).padStart(2, "0")}/` +
          `${String(d.getMonth() + 1).padStart(2, "0")}/` +
          `${d.getFullYear()}`;

        awaitingEntrevista.delete(from);

        await sendWithTyping(
          sock,
          from,
          `⚠️ *Você já possui entrevista agendada.* 📅 Data: ${dataFormatada}`,
        );
        return;
      }

      awaitingEntrevista.delete(from);
      await sendWithTyping(
        sock,
        from,
        "⚠️ *Visitante não liberado(a) para agendar entrevista.*",
      );
      return;
    }

    // ===== ETAPA DATA =====
    if (estado.etapa === "data") {
      const dataStr = messageBody.trim();
      const { cpf } = estado;

      const partes = dataStr.split("/");
      if (partes.length !== 3) {
        await sendWithTyping(sock, from, "⚠️ Data inválida. Use DD/MM/AAAA:");
        return;
      }

      const [dia, mes, ano] = partes;
      const inputDate = new Date(ano, mes - 1, dia);

      if (isNaN(inputDate.getTime())) {
        await sendWithTyping(sock, from, "⚠️ Data inválida. Informe apenas DD/MM/AAAA \nDigite novamente:");
        return;
      }

      const dataSQL = `${ano}-${mes}-${dia}`;

      const [feriado] = await pool.execute(
        `SELECT 1 FROM feriados WHERE data = ? LIMIT 1`,
        [dataSQL],
      );

      if (feriado.length > 0) {
        await sendWithTyping(
          sock,
          from,
          "⚠️ Data é feriado. Escolha outro dia:",
        );
        return;
      }

      const dayOfWeek = inputDate.getDay();
      if (dayOfWeek < 1 || dayOfWeek > 3) {
        await sendWithTyping(
          sock,
          from,
          "⚠️ Entrevistas são realizadas somente de segunda à quarta, escolha outra data.",
        );
        return;
      }

      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      const dataMinima = new Date(hoje);
      dataMinima.setDate(hoje.getDate() + 3);

      if (inputDate < dataMinima) {
        await sendWithTyping(
          sock,
          from,
          "⚠️ Agende com no mínimo 3 dias de antecedência, escolha outra data.",
        );
        return;
      }

      const [agendamentos] = await pool.execute(
        `SELECT COUNT(*) AS total 
         FROM entrevista 
         WHERE data_entrevista = ?`,
        [dataSQL],
      );

      if (agendamentos[0].total >= 3) {
        await sendWithTyping(
          sock,
          from,
          "⚠️ Data sem vagas disponíveis. Escolha outro dia.",
        );
        return;
      }

      await pool.execute(
        `INSERT INTO entrevista (visitante_cpf, data_entrevista, ativa)
         VALUES (?, ?, true)`,
        [cpf, dataSQL],
      );

      await pool.execute(
        `UPDATE visitantes_cad 
         SET agendamento = false 
         WHERE Cpf_Visi = ?`,
        [cpf],
      );

      const [visitanteDados] = await pool.execute(
        `SELECT Nome_Visi FROM visitantes_cad WHERE Cpf_Visi = ? LIMIT 1`,
        [cpf],
      );

      const nomeVisitante = visitanteDados[0]?.Nome_Visi ?? "Visitante";

      await enviarEmailAgendamento({
        nome: nomeVisitante,
        cpf,
        data: dataStr,
      });

      console.log(`📅 Nova Entrevista agendada para ${nomeVisitante}, CPF: ${cpf} - em ${dataStr}`);

      awaitingEntrevista.delete(from);

      await sendWithTyping(
        sock,
        from,
        `✅ *Entrevista agendada com sucesso!* 📅 Data: ${dataStr}  
⏰ Compareça no período da manhã.`,
      );
    }
  } catch (err) {
    console.error("Erro ao processar entrevista:", err);
    await sendWithTyping(
      sock,
      from,
      "❌ Erro ao processar entrevista. Tente novamente mais tarde.",
    );
  }
};
