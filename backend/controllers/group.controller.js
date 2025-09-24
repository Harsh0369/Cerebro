import express from 'express';
import {Group} from '../models/group.model.js';
import Membership from '../models/membership.model.js';

export const createGroup = async (req, res) => {
    try {
        const { name, subject } = req.body;
        const createdBy = req.user._id;
        const group = await Group.create({ name, subject, createdBy });
        // Add the creator as an admin member of the group
        await Membership.create({ user: createdBy, group: group._id, role: 'admin' });
        res.status(201).json({ group });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const joinGroup = async (req, res) => {
    try {
        const groupId = req.params.id;
        const userId = req.user._id;
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }
        const membership = await Membership.findOne({ user: userId, group: groupId });
        if (membership) {
            return res.status(400).json({ message: "User is already a member of the group" });
        }
        await Membership.create({ user: userId, group: groupId, role: 'member' });
        res.status(200).json({ message: "Successfully joined the group" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const leaveGroup = async (req, res) => {
    try {
        const groupId = req.params.id;
       const userId = req.user._id;
        const membership = await Membership.findOne({ user: userId, group: groupId }); 
       if (!membership) {
           return res.status(404).json({ message: "User is not a member of the group" });
       }
       await Membership.deleteOne({ user: userId, group: groupId });
       res.status(200).json({ message: "Successfully left the group" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const removeUser = async (req, res) => {
    try {
        const groupId = req.params.id;
        const { userId } = req.body;
        const requesterId = req.user._id;
        const requesterMembership = await Membership.findOne({ user: requesterId, group: groupId });
        if (!requesterMembership || requesterMembership.role !== 'admin') {
            return res.status(403).json({ message: "Only group admins can remove members" });
        }
        const membership = await Membership.findOne({ user: userId, group: groupId });
        if (!membership) {
            return res.status(404).json({ message: "User is not a member of the group" });
        }
        await Membership.deleteOne({ user: userId, group: groupId });
        res.status(200).json({ message: "User removed from the group" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}