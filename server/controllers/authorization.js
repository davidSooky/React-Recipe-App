import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import Profile from "../models/users.js";

dotenv.config();

export const signup = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    try {
        if(password !== confirmPassword) return res.status(400).send("Password does not match.");

        const existingUser = await Profile.findOne({email});
        if(existingUser) return res.status(400).send("Email already in use.");

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newProfile = await Profile.create({username, email, password: hashedPassword});
        const token = jwt.sign({username: newProfile.username, id: newProfile._id}, process.env.TOKEN_SECRET, {expiresIn: "2h"});

        res.status(201).json({result: newProfile, token})
    } catch (error) {
        res.status(500).send("Something went wrong. Try again later.");
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Profile.findOne({email});
        if(!user) return res.status(404).send("No user found with this email.");

        const passwordCheck = await bcrypt.compare(password, user.password);
        if(!passwordCheck) return res.status(400).send("Password not valid.");

        const token = jwt.sign({username: user.username, id: user._id}, process.env.TOKEN_SECRET, {expiresIn: "2h"});
        res.status(200).json({result: user, message:"Logged in successfully", token});
    } catch (error) {
        res.status(500).send("Something went wrong. Try again later.");
    }
};