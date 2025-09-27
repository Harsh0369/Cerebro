import express from "express"
import { User } from "../models/user.model.js"

// login logout  register 
export const register = async (req, res) => {
  try {
    const { name, username, email, password, subjects, availability, avatar } =
      req.body;

    // Create user
    const user = await User.create({
      name,
      username,
      email,
      password,
      subjects,
      availability,
      avatar,
    });

    // Remove password before sending response
    const userObj = user.toObject();
    delete userObj.password;

    // Generate token using method defined on schema
    const token = user.generateToken();

    res.status(201).json({
      message: "User registered successfully",
      user: userObj,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
      const token = user.generateToken();
        res.status(200).json({ message: "Login successful", user, token });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const logout =async(req,res)=>{
    try {
        res.clearCookies("token",
        {httpOnly:true})

         return res.status(200).json({message:"User logout successfully"})   
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};