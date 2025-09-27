import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { Membership } from "./models/membership.model.js";
import { Message } from "./models/message.model.js";

dotenv.config();

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

io.on("connection", async (socket) => {
  console.log("User connected:", socket.id);

  // 1️⃣ Authenticate socket
  const token = socket.handshake.auth.token;
  if (!token) {
    console.log("No token provided, disconnecting:", socket.id);
    return socket.disconnect();
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log("Invalid token, disconnecting:", socket.id);
    return socket.disconnect();
  }

  socket.userId = decoded.id;
  console.log("Socket authenticated for user:", socket.userId);

  // 2️⃣ Join rooms based on memberships
  try {
    const memberships = await Membership.find({ user: socket.userId }).populate(
      "group"
    );

    // Join each group room
    await Promise.all(
      memberships.map((membership) => {
        const room = `group_${membership.group._id}`;
        socket.join(room);
        console.log(`User ${socket.userId} joined room ${room}`);
      })
    );
  } catch (err) {
    console.error("Error fetching memberships:", err);
  }

  // 3️⃣ Listen for messages
  socket.on("sendMessage", async ({ groupId, content }) => {
    if (!groupId || !content) return;

    try {
      const message = await Message.create({
        group: groupId,
        sender: socket.userId, // corrected
        content,
      });

      const populatedMsg = await message.populate(
        "sender",
        "username name avatar"
      );

      // Emit to all users in the group
      io.to(`group_${groupId}`).emit("receiveMessage", populatedMsg);

      console.log(
        `💬 Message in group ${groupId} from ${socket.userId}: ${content}`
      );
    } catch (err) {
      console.error("❌ sendMessage error:", err);
    }
  });

  // 4️⃣ Handle disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
