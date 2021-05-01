import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import Profile from "../models/users.js";

dotenv.config();

export const signup = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    try {
        if(password !== confirmPassword) return res.status(400).json({message: "Password does not match."});

        const existingUser = await Profile.findOne({email});
        if(existingUser) return res.status(400).json({message: "Email already in use."});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newProfile = await Profile.create({username, email, password: hashedPassword});
        const token = jwt.sign({email: newProfile.email, id: newProfile._id}, process.env.TOKEN_SECRET, {expiresIn: "24h"});

        return res.status(201).json({result: newProfile, token})
    } catch (error) {
        return res.status(500).json({message: "Something went wrong."});
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Profile.findOne({email});
        if(!user) return res.status(404).json({message: "No user found with this email."});

        const passwordCheck = await bcrypt.compare(password, user.password);
        if(!passwordCheck) return res.status(400).json({message: "Password not valid."});

        const token = jwt.sign({email: user.email, id: user._id}, process.env.TOKEN_SECRET, {expiresIn: "24h"});
        return res.status(200).json({result: user, message:"Logged in successfully", token});
    } catch (error) {
        return res.status(500).json({message: "Something went wrong."});
    }
};