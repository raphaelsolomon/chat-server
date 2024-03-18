import { Document } from 'mongoose';

export interface IChatMessage extends Document {
  readonly uuid: string;

  sender_uuid: string;

  receiver_uuid: string;

  content: string;

  chat: string;
}
