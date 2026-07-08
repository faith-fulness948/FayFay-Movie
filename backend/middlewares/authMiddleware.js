import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
    try {
        console.log("Cookies:", req.cookies);

        const token = req.cookies["auth-token"];

        console.log("Token:", token);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token found"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Decoded:", decoded);

        const user = await User.findById(decoded.userId).select("-password");

        console.log("User:", user);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = user;

        next();

    } catch (error) {
        console.log(error);

        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

export default authMiddleware;