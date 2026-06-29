import nodemailer from "nodemailer";
// import "dotenv/config"

// Create a transporter

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD, // The 16-character App Password
  },
});

// const mailOptions = {
//     from: `MongoDB_Class <${process.env.NODEMAILER_USER}`,
//     to: "ayodejiaronimo@gmail.com",
//     subject: "Test Email from Nodemailer",
//     text: "This is just a test!",
//     html: `<h1>This is a test from stubborn Fayfay</h1>`,
// }

const sendEmail = async (mailOptions) => {
    try {
        const finalOptions = {
            from: `MongoDB_Class <${process.env.EMAIL_USER}>`,
            ...mailOptions,
        }

        const info = await transporter.sendMail(finalOptions);
        console.log("Email Successful:", info.messageId);
    } catch (error) {
        console.error("Email Error:", error);       
    }
}

export default sendEmail;

