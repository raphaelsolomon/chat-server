import { Document } from 'mongoose';

export interface IChatMessage extends Document {
  uuid: string;



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
    type: String,
    required: true,
  },
}
