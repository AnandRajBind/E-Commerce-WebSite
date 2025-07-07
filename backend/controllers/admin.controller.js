// const express = require('express');
import { Admin } from '../models/admin.model.js'; // Assuming you have a admin model defined
import bcrypt from 'bcrypt';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import config from '../config.js';
// import 'dotenv/config';

export const signup = async (req, res) => {
    // zod library are used to validate the data
    console.log("req.body", req.body);
    const { firstName, lastName, email, password } = req.body;
    const adminSchema = z.object({
        firstName: z.string().min(3, { message: "First name must be at least 3 characters " }),
        lastName: z.string().min(3, { message: "Last name must be at least 3 characters " }),
        email: z.string().min(3, { message: "email   must be at least 3 characters " }),
        password: z.string().min(6, { message: "password must be at least 6 characters " })
    });
    const validateData = adminSchema.safeParse(req.body);
    if (!validateData.success) {
        return res.status(400).json({ errors: validateData.error.issues.map((err) => err.message) });
    }
    // bcrypt are used to hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const existingAdmin = await Admin.findOne({ email: email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" })
        }
        const newAdmin = new Admin({ firstName, lastName, email, password: hashedPassword });
        await newAdmin.save();
        res.status(200).json({ message: "Admin created successfully", admin: newAdmin });
    } catch (error) {
        res.status(500).json({ message: "error in signup ", error: error.message });
    }
}
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email: email });
        const isPasswordCorrect = await bcrypt.compare(password, admin.password);
        if (!admin || !isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // jwt are used to create a token for the admin
        const token = jwt.sign({ id: admin._id }, config.JWT_ADMIN_PASSWORD, { expiresIn: "1d" });// Set the token to expire in 1 day

        const cookieOptions = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
            httpOnly: true, // Prevents client-side JavaScript from accessing the cookie or cannot be accessed by JavaScript directly
            secure: process.env.NODE_ENV === "production", // Ensures the cookie is only sent over HTTPS in production
            sameSite: "Strict" // Prevents the cookie from being sent with cross-site requests or CSRF attacks
        }
        // Set the token in the cookies
        res.cookie("jwt", token, cookieOptions);
        res.status(200).json({ message: "login successful", admin, token })
    } catch (error) {
        res.status(500).json({ message: "error in login", error: error.message });
        console.log(error.message);
    }
}
export const logout = async (req, res) => {
    try {
        if (!req.cookies.jwt) {
            return res.status(401).json({ error: "kindly login first" })
        }
        res.clearCookie("jwt");
        res.status(200).json({ message: "logout successful" });
    } catch (error) {
        res.status(500).json({ message: "error in logout", error: error.message });
    }
}