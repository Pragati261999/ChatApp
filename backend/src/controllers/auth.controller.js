import { Profiler } from "react";
import User from '../models/User.js';
import jwt from "jsonwebtoken";


export async function signup(req, res) {
    const { email, password, fullName } = req.body;
    try {
        if (!email || !password || !fullName) {
            return res.status(400).json({ message: "All fields ar required" });
        }
        if (password.lenth < 6) {
            return res.status(400).json({ message: "must be 6 digits " });

        }
        const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (!emailFormat.test(email)) {
            return res.status(400).json({ message: "invailid mail" });
        }
        const existemail = await User.findOne({ email });
        if (existemail) {
            return res.status(400).json({ message: "already exist!" });

        }
        const idx = Math.floor(Math.random() * 100) + 1;

        const randomavtar = `https://avatar.iran.liara.run/public/${idx}.png`;
        const newuser = new User.create({
            email, fullName, password, ProfilePic: randomavtar
        });
        const token = jwt.sign({ userId: newuser._id }, process.env.JWT_SECRET, {
            expireIn: "7d"
        })
        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,    // prevent xss attacks, 
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })
        res.status(201).json({ success: true, user: newuser })
        // });

    } catch (error) {

    }
    res.send("signup Routes");
}
export async function login(req, res) {
}
export async function logout(req, res) {
    res.send("logout Routes");
}