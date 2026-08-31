const adminMiddleware = (req, res, next) => {
    console.log("ADMIN MIDDLEWARE");
    console.log("req.user:", req.user);

    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Not authenticated"
        });
    }
    console.log("USER ROLE:", req.user.role);

    if (req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Admin access required"
        });
    }

    next();
};

export default adminMiddleware;