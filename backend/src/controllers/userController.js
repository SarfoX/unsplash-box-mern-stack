import dotenv from 'dotenv';
import User from '../models/user.model.js';
import { generateToken } from '../lib/utils.js';
import bcrypt from "bcryptjs";

dotenv.config();

export const register = async (req, res) => {
    const {fullName, email, password} = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({message: "All fields must be filled"});
        }

        if (password.length < 8) {
            return res.status(400).json({message: "Password must be at least 8 characters"});
        }
    
        const user = await User.findOne({email});

        if (user) return res.status(400).json({message: "Email aready exists"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        if (newUser) {
            // generate jwt token here
            generateToken(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePicUrl: newUser.profilePicUrl,
                collections: newUser.collections,
            })

        } else {
            res.status(400).json({message: "Invalid user data"});
        }
    } catch (error) {
        console.log("Error in regiser controller: ", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const login = async (req, res) =>{
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});

        if (!user) return res.status(400).json({message: "Invalid credentials"});

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"});

        generateToken(user._id, res);

        res.status(200).json({
            _id:user._id,
            fullName: user.fullName,
            profilePicUrl: user.profilePicUrl,
            collections: user.collections,
        })

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const logout = (req, res) =>{
    try {
        res.cookie("auth_cookie", "", {maxAge:0});
        res.status(200).json({message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const checkUserAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkUserAuth controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}
