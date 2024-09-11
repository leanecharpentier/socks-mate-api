import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { UserBuilder } from "./tests/datas.js";
import { User } from "../users/models.js";

async function isAuthenticated (req, res, next) {
    let token = req.header('Authorization');
    token = token.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: "Invalid token " });
    }
    try {
        const tokenDecoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = tokenDecoded.userId;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Unauthorized" });
    }
}

const hashPassword = async (password) => {
    const saltRounds = 10; 
    const hash = await bcrypt.hash(password, saltRounds);
    return hash; 
};

async function generateToken() {
    const userBuilder = new UserBuilder()
    const user = new User(userBuilder)
    user.password = await hashPassword(user.password)
    await user.save()

    const tokenData = {
        userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY);
    return {token: token, userId: user._id}
}

async function clearDatabase() {
    await User.deleteMany({})
}

export { isAuthenticated, hashPassword, generateToken, clearDatabase };