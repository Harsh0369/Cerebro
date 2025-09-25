import express from 'express';
import { User } from '../models/user.model.js';


// register login logout deleteaccount resetPassword getUserProfile 
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



export const updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.userId, updates, {
      new: true,
      runValidators: true,
    }).select("-password");
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const uploadAvatar = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file" });
  const avatarUrl = `/uploads/${req.file.filename}`; // or cloud storage
  const user = await User.findByIdAndUpdate(
    req.userId,
    { avatar: avatarUrl },
    { new: true }
  ).select("-password");
  res.json({ avatar: user.avatar });
};
