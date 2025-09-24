import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
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