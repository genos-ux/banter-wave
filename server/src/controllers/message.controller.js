import cloudinary from "../config/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import { Message } from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsers = async(req,res,next) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne:loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error(`Error in getUsers: ${error.message}`);
        next(error);
    }
}

export const getMessages = async(req,res,next) => {
    try {
        const {id: userToChatId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
          $or: [
            {
              senderId: myId,
              receiverId: userToChatId,
            },
            {
                senderId: userToChatId,
                receiverId: myId
            }
          ],
        });

        res.status(200).json(messages);
    } catch (error) {
        console.error(`Error in getMessages: ${error.message}`);
        next(error);
    }
}

export const sendMessage = async(req,res,next) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            //Upload image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        await newMessage.save();

        // todo: realtime functionality goes here => socket.io
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);


    } catch (error) {
        console.error(`Error in sendMessage: ${error.message}`);
        next(error);
    }
}
