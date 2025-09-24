import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    group: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true },
    role: { type: String, enum: ["member", "admin"], default: "member" }
}, { timestamps: true });

const Membership = mongoose.model("Membership", membershipSchema);

export default Membership;
