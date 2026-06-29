// send verification email
export const sendVerificationTemplate = (username, verificationToken) => {
    const html = 
    `<div style="display: flex; flex-direction: column; align-items: center; width: 100%; gap: 20px;">
        <h1 style="background-color: purple; width: 100%; color: white; text-align: center; padding: 10px 0;">Verify Your Email</h1>

        <div>
            <h2>Hi, ${username}</h2>

            <p>Welcome to our learning platform. We expect you to really enjoy our platform to the fullest. Verify your email with the token below:</p>

            <p>Verification token: <span>${verificationToken}</span></p>
        </div>
    </div>`;

    return html;
}

// send successful verification email
export const verificationSuccessfulTemplate = `
    <div>
        Your Account has been verified successfully. You can proceed to login.
    </div>
`

export const resetPasswordTemplate = (url) => {
    return `
        <div>
            <p>Click this link to reset your password: <a href=${url}>Reset Password</a></p>

            <p>Or you can copy and paste this URL in your browser: ${url}</p>
        </div>
    `
}