// const express = require('express');
import {User} from '../models/user.model.js';
// import bcrypt from 'bcryptjs';
export const signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // const hashedPassword = await bcrypt.hash(password, 10);


    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        // const newUser = new User({ firstName, lastName, email, password: hashedPassword });
        const newUser = new User({ firstName, lastName, email, password: hashedPassword });
        await newUser.save();
        res.status(200).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "error in signup ", error: error.message });
    }
}
export const signin = async (req, res) => {
}

