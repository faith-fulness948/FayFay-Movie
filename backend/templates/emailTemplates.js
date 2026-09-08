// ===============================
// SEND VERIFICATION EMAIL
// ===============================
export const sendVerificationTemplate = (username, verificationToken) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your FayFay Movie Account</title>
    </head>

    <body style="
        margin: 0;
        padding: 0;
        background-color: #f5f3ff;
        font-family: Arial, Helvetica, sans-serif;
        color: #2d2d2d;
    ">

        <div style="
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        ">

            <!-- HEADER -->
            <div style="
                background-color: #6c2bd9;
                padding: 25px 20px;
                text-align: center;
            ">
                <h1 style="
                    margin: 0;
                    color: #ffffff;
                    font-size: 28px;
                ">
                    🎬 FayFay Movie
                </h1>

                <p style="
                    margin: 8px 0 0;
                    color: #eee5ff;
                    font-size: 14px;
                ">
                    Your world of movies
                </p>
            </div>


            <!-- CONTENT -->
            <div style="
                padding: 35px 30px;
            ">

                <h2 style="
                    margin-top: 0;
                    font-size: 24px;
                    color: #2d2d2d;
                ">
                    Hi ${username} 
                </h2>

                <p style="
                    font-size: 16px;
                    line-height: 1.6;
                    color: #555555;
                ">
                    Welcome to <strong>FayFay Movie</strong>! 
                    We're excited to have you join us.
                </p>

                <p style="
                    font-size: 16px;
                    line-height: 1.6;
                    color: #555555;
                ">
                    Before you can start exploring movies and enjoying
                    everything FayFay Movie has to offer, please verify
                    your email address using the verification code below.
                </p>


                <!-- VERIFICATION CODE -->
                <div style="
                    margin: 30px 0;
                    padding: 25px;
                    background-color: #f3edff;
                    border: 2px dashed #6c2bd9;
                    border-radius: 10px;
                    text-align: center;
                ">

                    <p style="
                        margin: 0 0 10px;
                        font-size: 13px;
                        color: #666666;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                    ">
                        Your Verification Code
                    </p>

                    <h2 style="
                        margin: 0;
                        color: #6c2bd9;
                        font-size: 32px;
                        letter-spacing: 6px;
                    ">
                        ${verificationToken}
                    </h2>

                </div>


                <p style="
                    font-size: 14px;
                    line-height: 1.6;
                    color: #777777;
                ">
                    Enter this code on the verification page to activate
                    your account.
                </p>

                <p style="
                    font-size: 14px;
                    line-height: 1.6;
                    color: #777777;
                ">
                    If you didn't create a FayFay Movie account, you can
                    safely ignore this email.
                </p>

            </div>


            <!-- FOOTER -->
            <div style="
                background-color: #fafafa;
                padding: 20px;
                text-align: center;
                border-top: 1px solid #eeeeee;
            ">

                <p style="
                    margin: 0;
                    font-size: 13px;
                    color: #888888;
                ">
                    © ${new Date().getFullYear()} FayFay Movie
                </p>

                <p style="
                    margin: 8px 0 0;
                    font-size: 12px;
                    color: #aaaaaa;
                ">
                    Enjoy the movies. 
                </p>

            </div>

        </div>

    </body>
    </html>
    `;
};


// ===============================
// SUCCESSFUL VERIFICATION EMAIL
// ===============================
export const verificationSuccessfulTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Verified</title>
</head>

<body style="
    margin: 0;
    padding: 0;
    background-color: #f5f3ff;
    font-family: Arial, Helvetica, sans-serif;
    color: #2d2d2d;
">

    <div style="
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    ">

        <!-- HEADER -->
        <div style="
            background-color: #6c2bd9;
            padding: 25px;
            text-align: center;
        ">
            <h1 style="
                margin: 0;
                color: white;
                font-size: 28px;
            ">
                🎬 FayFay Movie
            </h1>
        </div>


        <!-- CONTENT -->
        <div style="
            padding: 40px 30px;
            text-align: center;
        ">

            

            <h2 style="
                margin: 0 0 15px;
                color: #2d2d2d;
            ">
                Your Account Has Been Verified!
            </h2>

            <p style="
                font-size: 16px;
                line-height: 1.6;
                color: #666666;
            ">
                Your FayFay Movie account has been successfully verified.
                You can now log in and start exploring movies.
            </p>

            <div style="
                margin: 30px 0;
                padding: 18px;
                background-color: #f3edff;
                border-radius: 8px;
            ">
                <p style="
                    margin: 0;
                    color: #6c2bd9;
                    font-weight: bold;
                ">
                    Your account is ready! 
                </p>
            </div>

            <p style="
                font-size: 14px;
                color: #888888;
            ">
                Thank you for joining FayFay Movie.
            </p>

        </div>


        <!-- FOOTER -->
        <div style="
            background-color: #fafafa;
            padding: 20px;
            text-align: center;
            border-top: 1px solid #eeeeee;
        ">

            <p style="
                margin: 0;
                font-size: 13px;
                color: #888888;
            ">
                © ${new Date().getFullYear()} FayFay Movie
            </p>

            <p style="
                margin: 8px 0 0;
                font-size: 12px;
                color: #aaaaaa;
            ">
                Your world of movies 
            </p>

        </div>

    </div>

</body>
</html>
`;


// ===============================
// RESET PASSWORD EMAIL
// ===============================
export const resetPasswordTemplate = (url) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
    </head>

    <body style="
        margin: 0;
        padding: 0;
        background-color: #f5f3ff;
        font-family: Arial, Helvetica, sans-serif;
        color: #2d2d2d;
    ">

        <div style="
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        ">

            <!-- HEADER -->
            <div style="
                background-color: #6c2bd9;
                padding: 25px;
                text-align: center;
            ">

                <h1 style="
                    margin: 0;
                    color: white;
                    font-size: 28px;
                ">
                     FayFay Movie
                </h1>

                <p style="
                    margin: 8px 0 0;
                    color: #eee5ff;
                    font-size: 14px;
                ">
                    Password Reset
                </p>

            </div>


            <!-- CONTENT -->
            <div style="
                padding: 35px 30px;
            ">

                <h2 style="
                    margin-top: 0;
                ">
                    Reset Your Password 
                </h2>

                <p style="
                    font-size: 16px;
                    line-height: 1.6;
                    color: #555555;
                ">
                    We received a request to reset the password for your
                    FayFay Movie account.
                </p>

                <p style="
                    font-size: 16px;
                    line-height: 1.6;
                    color: #555555;
                ">
                    If you made this request, click the button below to
                    create a new password.
                </p>


                <!-- BUTTON -->
                <div style="
                    text-align: center;
                    margin: 30px 0;
                ">

                    <a href="${url}"
                       style="
                            display: inline-block;
                            padding: 14px 28px;
                            background-color: #6c2bd9;
                            color: #ffffff;
                            text-decoration: none;
                            border-radius: 7px;
                            font-size: 16px;
                            font-weight: bold;
                       ">
                        Reset My Password
                    </a>

                </div>


                <p style="
                    font-size: 14px;
                    line-height: 1.6;
                    color: #777777;
                ">
                    If the button doesn't work, copy and paste the link
                    below into your browser:
                </p>

                <div style="
                    padding: 12px;
                    background-color: #f7f7f7;
                    border-radius: 6px;
                    word-break: break-all;
                    font-size: 13px;
                    color: #666666;
                ">
                    ${url}
                </div>


                <p style="
                    margin-top: 25px;
                    font-size: 14px;
                    line-height: 1.6;
                    color: #777777;
                ">
                    If you didn't request a password reset, you can safely
                    ignore this email. Your password will remain unchanged.
                </p>

            </div>


            <!-- FOOTER -->
            <div style="
                background-color: #fafafa;
                padding: 20px;
                text-align: center;
                border-top: 1px solid #eeeeee;
            ">

                <p style="
                    margin: 0;
                    font-size: 13px;
                    color: #888888;
                ">
                    © ${new Date().getFullYear()} FayFay Movie
                </p>

                <p style="
                    margin: 8px 0 0;
                    font-size: 12px;
                    color: #aaaaaa;
                ">
                    Stay safe and enjoy the movies. 
                </p>

            </div>

        </div>

    </body>
    </html>
    `;
};