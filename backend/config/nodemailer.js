import { BrevoClient } from "@getbrevo/brevo";

const brevo = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY,
});

const sendEmail = async (mailOptions) => {
    try {
        const response = await brevo.transactionalEmails.sendTransacEmail({
            sender: {
                name: "FayFay Movie",
                email: process.env.BREVO_SENDER_EMAIL,
            },

            to: [
                {
                    email: mailOptions.to,
                },
            ],

            subject: mailOptions.subject,
            htmlContent: mailOptions.html,
        });

        console.log("Brevo email sent:", response);

        return response;

    } catch (error) {
        console.error("Brevo Error:", error);
        throw error;
    }
};

export default sendEmail;