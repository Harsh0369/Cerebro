import { Message } from "../models/message.model.js";

export const getMessages = async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const userId = req.id;

        if (!groupId) {   
            return res.status(400).json({ message: "Group ID is required" });
        }

        if(!userId){
            return res.status(400).json({ message: "User ID is required" });
        }
        const messages = await Message.find({ group: groupId }).populate('sender', 'name avatar email').sort({ createdAt: 1 });
        res.status(200).json({ messages });
    }
    catch (err)
    {
        res.status(500).json({ message: err.message });
    }
}
