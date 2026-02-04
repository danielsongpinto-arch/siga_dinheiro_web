interface SendEmailParams {
  email: string;
  message: string;
}

export async function sendFeedbackEmail({ email, message }: SendEmailParams) {
  try {
    const apiUrl = process.env.BUILT_IN_FORGE_API_URL;
    const apiKey = process.env.BUILT_IN_FORGE_API_KEY;

    if (!apiUrl || !apiKey) {
      console.error("Email service not configured");
      return false;
    }

    const response = await fetch(`${apiUrl}/email/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        to: "dgp@sigaodinheiro.com",
        subject: `Novo Feedback de ${email}`,
        html: `
          <h2>Novo Feedback Recebido</h2>
          <p><strong>Email do Remetente:</strong> ${email}</p>
          <p><strong>Mensagem:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      }),
    });

    return response.ok;
  } catch (error) {
    console.error("Erro ao enviar email de feedback:", error);
    return false;
  }
}
