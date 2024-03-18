import { Document } from 'mongoose';

export interface IChat extends Document {
  uuid: string;

  name: string;

  isGroupChat: boolean;

  lastMessage: string

  participants: {
    type: [string];
  };

  admin: {
    type: string;
  };
}
