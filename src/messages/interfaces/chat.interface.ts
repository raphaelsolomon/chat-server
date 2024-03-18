import { Document } from 'mongoose';

export interface IChat extends Document {
  readonly uuid: string;

  readonly name: string;

  readonly isGroupChat: boolean;

  readonly lastMessage: string;

  readonly participants: [string];

  readonly admin: string;
}
