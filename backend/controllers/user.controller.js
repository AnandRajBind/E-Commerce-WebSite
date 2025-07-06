// const express = require('express');
import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import { Purchase } from '../models/purchase.model.js'
import { Course } from '../models/course.model.js'
import 'dotenv/config';


export const signup = async (req, res) => {
    // zod library are used to validate the data
    const { firstName, lastName, email, password } = req.body;
    const userSchema = z.object({
        firstName: z.string().min(3, { message: "First name must be at least 3 characters " }),
        lastName: z.string().min(3, { message: "Last name must be at least 3 characters " }),
        email: z.string().min(3, { message: "email   must be at least 3 characters " }),
        password: z.string().min(6, { message: "password must be at least 6 characters " })
    });

    const validateData = userSchema.safeParse(req.body);
    if (!validateData.success) {
        return res.status(400).json({ errors: validateData.error.issues.map((err) => err.message) });
    }
    // bcrypt are used to hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }
        const newUser = new User({ firstName, lastName, email, password: hashedPassword });
        await newUser.save();
        res.status(200).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "error in signup ", error: error.message });
    }
}
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // jwt are used to create a token for the user
        const token = jwt.sign({ id: user._id }, config.JWT_USER_PASSWORD, { expiresIn: "1d" });// Set the token to expire in 1 day

        const cookieOptions = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
            httpOnly: true, // Prevents client-side JavaScript from accessing the cookie or cannot be accessed by JavaScript directly
            secure: process.env.NODE_ENV === "production", // Ensures the cookie is only sent over HTTPS in production
            sameSite: "Strict" // Prevents the cookie from being sent with cross-site requests or CSRF attacks
        }
        // Set the token in the cookies
        res.cookie("jwt", token, cookieOptions);
        res.status(200).json({ message: "login successful", user, token })
    } catch (error) {
        res.status(500).json({ message: "error in login", error: error.message });
        console.log(error.message);
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({ message: "logout successful" });
    } catch (error) {
        res.status(500).json({ message: "error in logout", error: error.message });
    }
}
// show the all purchased courses at the time of course purchase
export const purchases = async (req, res) => {
    const userId = req.userId;
    try {
        const purchased = await Purchase.find({ userId });
        let purchasedCourseId = [];
        for (let i = 0; i < purchased.length; i++) {
            purchasedCourseId.push(purchased[i].courseId);
        }
        const courseData = await Course.find({ _id: { $in: purchasedCourseId } })
        res.status(200).json({ purchased, courseData });
    } catch (error) {
        res.status(500).json({ message: "error in purchases", error: error.message });
    }
}
