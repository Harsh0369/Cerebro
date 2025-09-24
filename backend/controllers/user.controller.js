import express from 'express';
import { User } from '../models/user.model.js';

export const getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({ users });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}