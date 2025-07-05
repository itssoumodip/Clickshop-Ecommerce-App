import jwt from "jsonwebtoken";
import Admin from "../model/adminModel.js";
import expressAsyncHandler from "express-async-handler";

export const protect = expressAsyncHandler(async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            try {
                token = req.headers.authorization.split(" ")[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.admin = await Admin.findById(decoded.id).select("-password");
                
                if (!req.admin) {
                    res.status(401);
                    throw new Error("Not authorized as admin");
                }
                
                next();
            } catch (err) {
                res.status(401);
                throw new Error("Not authorized, token failed");
            }
        }

        if (!token) {
            res.status(401);
            throw new Error("Not authorized, no token");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});

export const isAdmin = expressAsyncHandler(async (req, res, next) => {
    if (req.admin && req.admin.role === 'admin') {
        next();
    } else {
        res.status(403);
        throw new Error('Not authorized as admin');
    }
});
