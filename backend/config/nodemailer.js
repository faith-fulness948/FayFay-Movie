import brevo from "@getbrevo/brevo";

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY
);

const sendEmail = async (mailOptions) => {
    try {
        const sendSmtpEmail = new brevo.SendSmtpEmail();

        sendSmtpEmail.subject = mailOptions.subject;

        sendSmtpEmail.htmlContent = mailOptions.html;

        sendSmtpEmail.sender = {
            name: "FayFay Movie",
            email: process.env.BREVO_SENDER_EMAIL
        };

        sendSmtpEmail.to = [
            {
                email: mailOptions.to
            }
        ];

        const response = await apiInstance.sendTransacEmail(sendSmtpEmail);

        console.log("Brevo email sent:", response);

        return response;

    } catch (error) {
        console.error("Brevo Error:", error);
        throw error;
    }
};

export default sendEmail;
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// const sendEmail = async (mailOptions) => {
//     try {
//         const response = await resend.emails.send({
//             from: "FayFay Movie <onboarding@resend.dev>",
//             to: [mailOptions.to],
//             subject: mailOptions.subject,
//             html: mailOptions.html,
//         });

//         console.log("Email sent:", response);

//     } catch (error) {
//         console.error("Resend Error:", error);
//         throw error;
//     }
// };

// export default sendEmail;