import sendEmail from "../config/nodemailer.js";
import { resetPasswordTemplate, sendVerificationTemplate, verificationSuccessfulTemplate } from "../templates/emailTemplates.js";

// send verification email helper function
export const sendVerificationEmail = async (username, email, verificationToken) => {
    console.log("sendVerificationEmail called");
    const mailOptions = {
        to: email,
        subject: "Verify Your Email",
        html: sendVerificationTemplate(username, verificationToken),
    }

    return await sendEmail(mailOptions);
} 

// send successful verification email helper function
export const sendSuccessfullyVerifiedEmail = async (email) => {
    const mailOptions = {
        to: email,
        subject: "Verification Successful",
        html: verificationSuccessfulTemplate,
    };

    return await sendEmail(mailOptions);
};

// send reset password email
export const sendResetPasswordEmail = async (email, url) => {
    const mailOptions = {
        to: email,
        subject: "Reset Your Password",
        html: resetPasswordTemplate(url),
    }

    return await sendEmail(mailOptions);
}