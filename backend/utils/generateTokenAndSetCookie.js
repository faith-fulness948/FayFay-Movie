import jwt from "jsonwebtoken"

export const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("auth-token", token, {
        httpOnly: true, // prevents XSS  
        // secure: true && process.env.NODE_ENV === 'production', // activates only when it's in production
        sameSite: 'none', // prevents CSRF
        maxAge: 7 * 24 * 60 * 60 * 1000, // expiration date
        path: "/",
    })

    return token;
}