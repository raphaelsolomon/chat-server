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
  @ObjectIdColumn()
  sender_uuid: string;
  @Column({ nullable: false })
  content: string;
  @Column({ nullable: false })
  message: string;
  message_type?: string;
}
