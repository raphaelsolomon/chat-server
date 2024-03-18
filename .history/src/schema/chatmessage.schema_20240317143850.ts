import mongoose from 'mongoose';
import {
  BeforeInsert,
  Column,
  Entity,
  ObjectId,
  ObjectIdColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export const ChatMessage =  new mongoose.Schema ({
  
});
  constructor(chatMessage?: Partial<ChatMessage>) {
    Object.assign(this, chatMessage);
  }
  @ObjectIdColumn()
  id: ObjectId;

  @Column({ nullable: false })
  uuid: string;

  @Column({ nullable: false })
  sender_uuid: string;

  @Column({ nullable: false })
  receiver_uuid: string;

  @Column({ nullable: false })
  content: string;

  @Column()
  chat?: string;

  @BeforeInsert()
  async beforeInsert(): Promise<void> {
    this.uuid = uuidv4();
  }
}
