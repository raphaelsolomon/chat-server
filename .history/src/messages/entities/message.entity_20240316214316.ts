import {
  BeforeInsert,
  Column,
  Entity,
  ObjectId,
  ObjectIdColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class ChatMessage {
  constructor(chatMessage?: Partial<ChatMessage>) {
    Object.assign(this, chatMessage);
  }
  @Obj
  sender_uuid: string;
  receiver_uuid: string;
  message: string;
  message_type?: string;
}
