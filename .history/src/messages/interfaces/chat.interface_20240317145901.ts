import { Document } from 'mongoose';

export interface IChat extends Document {
  uuid: string;

  name: string;

  isGroupChat: {
    type: boolean;
    default: false;
  };

  lastMessage: {
    type: string;
  };

  participants: {
    type: [string];
  };

  admin: {
    type: string;
  };
}
