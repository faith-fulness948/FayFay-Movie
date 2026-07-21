import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendEmail = async (mailOptions) => {
    try {
        console.log("Sending email to:", mailOptions.to);

        const finalOptions = {
            from: `FayFay Movie <${process.env.EMAIL_USER}>`,
            ...mailOptions
        };

        console.log("About to send email...");

        const info = await transporter.sendMail(finalOptions);

        console.log("Email sent successfully:", info.messageId);

    } catch (error) {
        console.error("Email Error:", error);
        throw error;
    }
};

export default sendEmail;