import { Document } from 'mongoose';

export interface IChat extends Document {
  readonly uuid: string;

  readonly name: string;

  isGroupChat: boolean;

  lastMessage: string;

  participants: [string];

  admin: string;
}
