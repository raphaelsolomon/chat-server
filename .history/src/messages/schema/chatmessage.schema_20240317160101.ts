import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export const ChatMessage = new mongoose.Schema(
  {
    uuid: {
      type: String,
      default: uuidv4,
    },

    sender_uuid: {
      type: String,
      required: true,
    },
    
    receiver_uuid: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
    },
  },
  { timestamps: true },
);
