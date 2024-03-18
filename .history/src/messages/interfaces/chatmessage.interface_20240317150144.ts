import { Document } from 'mongoose';

export interface IChatMessage extends Document {
  readonly uuid: string;

  readonly sender_uuid: string;

  readonly receiver_uuid: string;

  content: string;

  chat: string;
}
