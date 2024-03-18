import { Document } from 'mongoose';

export interface IChatMessage extends Document {
  uuid: string;

  name: string;

  isGroupChat: boolean;

  lastMessage: string;

  participants: [string];

  admin: string;
}
