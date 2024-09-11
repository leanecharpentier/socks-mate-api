import { User } from "./models.js"
import { addUserValidation, loginValidation } from "./validations.js"

import bcrypt from "bcrypt"
import { ObjectId } from "mongodb"
import jwt from "jsonwebtoken"
import { hashPassword } from "../tools/helpers.js"

export async function login(req, res) {
    const { username, password } = req.body;
    const { error } = loginValidation.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details.map((d) => d.message) });
    } 
    try {
        const user = await User.findOne({ username: username });
        if (user) {
            const match = await bcrypt.compare(password, user.password); 
            if (match) {
                const tokenData = {
                    userId: user._id,
                };
                const token = jwt.sign(tokenData, process.env.SECRET_KEY);
                return res.status(200).json({ token: token, userId: user._id });
            } else {
                return res.status(401).json({message: "Unauthorized"});
            }
        } else {
            res.status(401).json({message: "Unauthorized"});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "error"});
    }   
}

export async function addUser(req, res) {
    const userData = req.body;
    const { error } = addUserValidation.validate(userData);
    if (error) {
        return res.status(400).json({ error: error.details.map((d) => d.message) });
    }
    const password = userData.password;
    try {
        const hashedPassword = await hashPassword(password);
        userData.password = hashedPassword;
        const user = new User(userData);
        const savedUser = await user.save();
        const tokenData = {
            userId: savedUser._id,
        };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY);
        return res.status(200).json({ token: token, userId: user._id });
    } catch (error) {
        if (error.code === 11000 && error.keyPattern?.username) {
            return res.status(409).json({ message: 'User with the same email already exists' });
        } else {
            console.error("Error adding user:", error);
            return res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    } 
}

export async function getUserById(req, res) {
    const userId = req.params.id
    try {
        const user = await User.findById(userId)
        if (!user) return res.status(404).send({ message: "No data found" });
        res.status(200).send(user)
    } catch (error) {
        console.error(error);
        
        res.status(500).send("Internal Servor Error")
    }
}

export async function getUsers(req, res) {
    try {
        const users = await User.find({})
        if (!users || users.length == 0) return res.status(404).send({ message: "No data found" });
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send("Internal Servor Error")
    }
}

export async function giveLike(req, res) {
    const userIdGive = req.user
    const userIdReceive = req.params.id
    try {
        await User.findOneAndUpdate(
            { _id: userIdGive }, 
            { $addToSet: { giveLikes: userIdReceive } }, 
            { new: true }
        );

        await User.findOneAndUpdate(
            { _id: userIdReceive }, 
            { $addToSet: { receiveLikes: userIdGive } }, 
            { new: true }
        );
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
    return res.status(200).json({ message: "Like" })
}