import express from 'express';
import {Group} from '../models/group.model.js';
import Membership from '../models/membership.model.js';


// create-->public/private  join-->privte/public  leaveGroup removeUser-->ByAdmin groupChatting 
export const createGroup = async (req, res) => {
    try {
        const { name, subject ,grouptype,standard ,password } = req.body;
        const createdBy = req.id;

        if(!name || !subject || !grouptype || !standard){
            return res.status(400).json({
                message:"All field are required !!",
                success:false 
            })
        }

        if(grouptype=="private" && !password){
            return res.status(400).json({
                message:"Set password for the private group !!",
                success:false ,
            })
        }
        const group = await Group.create({ name, subject, grouptype,standard ,password , createdBy }).select("-password");
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

export const joinPrivateGroup = async(req,res)=>{
    try {
        const {password , privateId }= req.body ;
        const userId = req.id ;
        const groupId = req.params;

        if(!password || !privateId || !groupId ){
            return res.status(400).json({
                message:"All fields are requored !!",
            success:false,
            })
        }

        const group = await Group.findById(groupId);
        if(!group){
            return res.status(404).json({
                message:"Group doesn't exist !!",
                success:false ,
            })
        }

        if(password !== group.password || privateId !== group.privateId){
             return res.status(404).json({
                message:"Invalid data for joining the private group !!",
                success:false ,
            })
        }

        await Membership.create({
            user:userId , 
            group:groupId , 
            
        }) ; 

        return res.status(200).json({
            message:"Joined the group successfully !!",
            success:true ,
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal error at joining the private group !!",
            success:false , 
        })
    }
}

export const leaveGroup = async (req, res) => {
    try {
        const groupId = req.params.id;
       const userId = req.id;
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
        const requesterId = req.id;
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

export const getAllGroups =async(req,res)=>{
    try {
        const groups =await Group.find().select("-password");
        

        return res.status(200).json({message:"Groups found successfully",success:true})
    } catch (error) {
        console.log(error)
    }
}
export const getGroupById =async(req,res)=>{
    try {
        const groupId =req.params.id;

        const group =await Group.findById(groupId).select("-password");

        if(!group){
            return res.status(404).json({message:"Group not found",success:false})
        }
        return res.status(200).json({message:"Group found successfully",success:false})
    } catch (error) {
        console.log(error)
    }
}