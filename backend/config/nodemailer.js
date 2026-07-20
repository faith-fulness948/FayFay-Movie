import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (mailOptions) => {
    try {

        const data = await resend.emails.send({
            from: "FayFay Movie <onboarding@resend.dev>",
            to: [mailOptions.to],
            subject: mailOptions.subject,
            html: mailOptions.html,
        });

        console.log("Email sent successfully:", data);

    } catch (error) {

        console.error("Resend Error:", error);
        throw error;

    }
};

export default sendEmail;