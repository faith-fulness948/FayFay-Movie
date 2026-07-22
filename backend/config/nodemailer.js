import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (mailOptions) => {
    try {
        const response = await resend.emails.send({
            from: "FayFay Movie <onboarding@resend.dev>",
            to: [mailOptions.to],
            subject: mailOptions.subject,
            html: mailOptions.html,
        });

        console.log("Email sent:", response);

    } catch (error) {
        console.error("Resend Error:", error);
        throw error;
    }
};

export default sendEmail;