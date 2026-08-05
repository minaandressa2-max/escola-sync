require('dotenv').config();
const express = require('express');
const { Resend } = require('resend');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/api/notificar', async (req, res) => {
  const { aluno, mensagem, emailPais } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'EscolaSync <onboarding@resend.dev>',
      to: [emailPais],
      subject: `Nova Notificação Escolar - ${aluno}`,
      html: `<strong>Aviso da Escola:</strong> <p>${mensagem}</p>`,
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor rodando com segurança na porta 3000');
});

