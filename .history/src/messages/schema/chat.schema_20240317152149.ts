import * as mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export class ChatSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      default: uuidv4,
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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ChatMessage',
    },

    participants: {
      type: [String],
    },

    admin: {
      type: String,
    },
  },
  { timestamps: true },
);
