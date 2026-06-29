import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    // username
    username: {
        type: String,
        required: [true, "Username is a required field!"],
        unique: true,
        trim: true,
        minLength: [3, "Username cannot be less than 3 characters!"],
    },

    // email
    email: {
        type: String,
        required: [true, "Email is a required field!"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please, fill a valid email address"],
    },

    // password
    password: {
        type: String,
        required: [true, "Password is a required field!"],
        minLength: [8, "Password cannot be less than 8 characters!"],
        select: false,
    },

    // last login
    lastLogin: Date,

    // is verified
    isVerified: {
        type: Boolean,
        default: false,
    },

    // tokens and expiry
    verificationToken: {
        type: String,
        select: false,
    },
    verificationTokenExpiresAt: {
        type: Date,
        select: false,
    },
    resetPasswordToken: {
        type: String,
        select: false,
    },
    resetPasswordTokenExpiresAt: {
        type: String,
        select: false,
    },
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;