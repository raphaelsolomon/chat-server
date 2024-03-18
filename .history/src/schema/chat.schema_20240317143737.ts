import * as mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export const ChatSchema = new mongoose.Schema({
  uuid: {
    type: String,
    de
  },

  name: {
    type: String,
    required: true,
  },

  isGroupChat: {
    type: Boolean,
    default: false,
  },

  lastMessage: {
    type: String,
  },

  participants: {
    type: [String],
  },

  admin: {
    type: String,
  },
});
