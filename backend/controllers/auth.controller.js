// imports
import { alreadyExistError, createSuccessMsg, internalServerError, notFoundError, requiredFieldError } from "../constants/messages.js";
import User from "../models/user.model.js"; // user model
import bcryptjs from "bcryptjs"; // password hashing
import { generateVerificationToken } from "../utils/generateVerificationToken.js"; // verification token
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"; // json web token
import { sendResetPasswordEmail, sendSuccessfullyVerifiedEmail, sendVerificationEmail } from "../utils/emailService.js"; // verification email
import crypto from "crypto";


// signup logic
export const signup = async (req, res) => {
    try {
        // destructuring to get specific fields
       const { username, email, password, ...otherFields} = req.body; 

        // check if a required field is missing
        if (!username || !email || !password ) {
            return res.status(400).json({
                success: false,
                message: requiredFieldError,
            })
        }

        // existing username or email
        const existingUserName = await User.findOne({username});
        const existingEmail = await User.findOne({email});

        // existing username
        if (existingUserName) {
            return res.status(400).json({
                success: false,
                message: alreadyExistError("Username")
            })
        }

        // existing email
        if (existingEmail) {
            return res.status(400).json({
                success: false,
                message: alreadyExistError("Email")
            })
        }

        const hashedPassword = await bcryptjs.hash(password, 12); // hashing password
        const lastLogin = new Date().toISOString(); // last login
        const verificationToken = generateVerificationToken(); // verification token

        // verification token expires in 1 hour
        const verificationTokenExpiresAt = Date.now() + (1 * 60 * 60 * 1000) // 1 hour in milliseconds 

        // adding the formatted data to the User model object
        const savedUser = await new User({
            username,
            email,
            password: hashedPassword,
            lastLogin: lastLogin,
            verificationToken: verificationToken,
            verificationTokenExpiresAt: verificationTokenExpiresAt,
            otherFields
        });

        await savedUser.save();

        // jwt
        const token = generateTokenAndSetCookie(res, savedUser._id);


        // res.status(201).json({
        //     success: true,
        //     message: createSuccessMsg("User"),
        //     token: token,
        //     data: {
        //         user: {
        //             ...savedUser._doc,
        //             password: undefined,
        //             verificationToken: undefined,
        //             verificationTokenExpiresAt: undefined,
        //             __v: undefined,
        //         }
        //     }
        // })

        // converting to an object
        const userResponse = savedUser.toObject();

        // taking out sensitive or unnecessary data
        delete userResponse.password;
        delete userResponse.verificationToken;
        delete userResponse.verificationTokenExpiresAt;
        delete userResponse.__v;

        // returning a response
        res.status(201).json({
            success: true,
            message: createSuccessMsg("User"),
            token: token,
            data: {
                user: userResponse,
            }
        });

        // sending email
        await sendVerificationEmail(savedUser.username, savedUser.email, savedUser.verificationToken);
    } catch (error) {
        console.error("Sign up:", error);

        res.status(500).json({
          success: false,
          message: internalServerError,
        });
    }
}

// verify email
export const verifyEmail = async (req, res) => {
    try {
        const { code } = req.body; // verification code input by the user

        // checking if the verification code is correct or has expired 
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: {$gt: Date.now()},
        });

        // if it has expired or doesn't match
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Verification token is not correct or has expired!"
            })
        }

        // updating the user's data
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        // response
        res.status(200).json({
            success: true,
            message: "User verified successfully!",
        })

        await sendSuccessfullyVerifiedEmail(user.email);
    } catch (error) {
        console.error("Verify email:", error);

        res.status(500).json({
          success: false,
          message: internalServerError,
        });
    }
}

// login
export const login = async (req, res) => {
    try{
        const { identifier, password } = req.body;

        if (!identifier || !password) {
            return res.status(400).json({
                success: false,
                message: requiredFieldError,
            })
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        const isEmail = emailRegex.test(identifier);

        const query = isEmail ? {email: identifier.toLowerCase()} : {username: identifier};

        const user = await User.findOne(query).select("+password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: isEmail ? "Email doesn't exist!" : "Username doesn't exist!"
            });
        };

        const isMatch = await bcryptjs.compare(password, user.password); // checking if password is correct 

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password!"
            });
        }

        const isVerified = user.isVerified;

        if(!isVerified) {
            return res.status(401).json({
                success: false,
                message: "Your account is not verified yet!"
            })
        };

        user.lastLogin = new Date().toISOString();

        await user.save();

        const token = generateTokenAndSetCookie(res, user._id);

        res.status(200).json({
            success: true,
            message: "Successfully logged in!",
            token: token,
            data: {
                user: {
                    ...user._doc,
                    password: undefined,
                    __v: undefined
                }
            }
        });

    } catch (error) {
        console.error("login error:", error);

        res.status(500).json({
          success: false,
          message: internalServerError,
        });
    }
}

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({
                success: false,
                message: notFoundError("user"),
            })
        }

        const resetPasswordToken = crypto.randomBytes(20).toString("hex");
        const resetPasswordTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordTokenExpiresAt = resetPasswordTokenExpiresAt;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Check your email to reset your password"
        });

        sendResetPasswordEmail(user.email, `${process.env.FRONTEND_URL}/reset-password/${resetPasswordToken}`);

    } catch (error) {
        console.error("forgot password error:", error);

        res.status(500).json({
          success: false,
          message: internalServerError,
        });
    }
};

export const resetPassword = async (req, res) => {
    try {
        
        const token = req.params.token;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordTokenExpiresAt: {$gt: Date.now()},
        });

        if (!user){
            return res.status(401).json({
                success: false,
                message: "You are not allowed to reset the password! Check your email to reset password!"
            });
        }

        const hashedPassword = await bcryptjs.hash(password, 12);
        
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiresAt = undefined;

        await user.save();
        
        res.status(200).json({
            success: true,
            message: "You have successfully reset password!"
        })

    } catch (error) {
        console.error("reset password error:", error);

        res.status(500).json({
          success: false,
          message: internalServerError,
        });
    }
}

export const logout = async(req, res) => {
    try {
        // Clears the specified cookie automatically
        res.clearCookie("auth-token", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
        });

        res.status(200).json({ 
            success: true,
            message: "Successfully logged out!",
        });
    } catch (error) {
        console.error("logout error:", error);

        res.status(500).json({
          success: false,
          message: internalServerError,
        });
    }
}