// const express = require('express');
import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { z } from 'zod';

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
        res.status(200).json({ message: "login successful", user })
    } catch (error) {
        res.status(500).json({ message: "error in login", error: error.message });
        console.log(error.message);

    }
}