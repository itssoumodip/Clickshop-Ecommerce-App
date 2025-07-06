import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import expressAsyncHandler from "express-async-handler";

const chqProtectedUser = expressAsyncHandler(async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            try {
                //req.headers.authorization="Bearer" "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTE2ZDYzM2YzZDI1MjcyNzAxODk0YyIsImlhdCI6MTcyMDgwNjg3NCwiZXhwIjoxNzIzMzk4ODc0fQ.EnYqKS5FK3F6Pb81P5kyGHWdCeKJSxP_9TiimzORt7Q"
                token = req.headers.authorization.split(" ")[1];
                //console.log(token);
                
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = await User.findById(decoded.id).select("-password");
                next();
            }
            catch (err) {
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

const chqSeler = expressAsyncHandler(async (req, res, next) => {
    try {
        let token;
        // console.log("Auth header:", req.headers.authorization);
        
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            try {
                token = req.headers.authorization.split(" ")[1];
                // console.log("Token:", token);
                
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                // console.log("Decoded token:", decoded);
                
                let user = await User.findById(decoded.id).select("-password");
                
                // Check if the user exists
                if (!user) {
                    console.error("User not found with ID:", decoded.id);
                    return res.status(404).json({ message: "User not found" });
                }
                
                // console.log("User found:", user.email, "Type:", user.userType);
                
                // Check if the user is a seller
                if (user.userType === "seller") {
                    console.log("Authenticated seller:", user._id, user.email);
                    req.user = user;
                    return next();
                } else {
                    console.error("User is not a seller:", user.userType, user._id);
                    return res.status(403).json({ 
                        message: "Not authorized as a seller",
                        currentUserType: user.userType,
                        userId: user._id
                    });
                }
            }
            catch (err) {
                console.error("JWT verification error:", err.message);
                return res.status(401).json({ 
                    message: "Authentication failed", 
                    error: err.message 
                });
            }
        }
        
        if (!token) {
            return res.status(401).json({ message: "Authentication token required" });
        }
    } catch (error) {
        console.error("Seller middleware error:", error);
        return res.status(500).json({ 
            message: "Server error", 
            error: error.message 
        });
    }
});
export { chqProtectedUser,chqSeler };