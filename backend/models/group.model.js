import mongoose from 'mongoose';
import crypto from "crypto"

const groupSchema = new mongoose.Schema({
    privateId:{
        type:String , 
    } , 
    name: {
        type: String,
        required: true,
        trim: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    standard:{
        type:String , 
        enum:["High School" , "Secondary School","College"] , 
    },
    grouptype:{
        type:String,
        enum:["public","private"],
        default:"public"
    },
    password:{
        type:String,
        minLength:6
    },

    
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Group = mongoose.model('Group', groupSchema);

export default Group;