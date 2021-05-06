import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    const token = req?.headers?.authorization?.split(" ")[1];
    if(!token) return res.status(401).send("Not authorized. Log in or sign up to use this feature.");

    try {
        const decodedData = jwt.verify(token, process.env.TOKEN_SECRET);
        req.userId = decodedData.id;

        next();
    } catch (error) {
        res.status(401).send("Invalid token"); 
    }
};

export default auth;