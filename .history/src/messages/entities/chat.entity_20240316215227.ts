import {
  BeforeInsert,
  Column,
  Entity,
  ObjectId,
  ObjectIdColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Chat {
  constructor(chatMessage?: Partial<Chat>) {
    Object.assign(this, chatMessage);
  }
  @ObjectIdColumn()
  id: ObjectId;

  @Column({ nullable: false })
  uuid: string;

  @Column({ nullable: false })
  sender_uuid: string;

  @Column({ nullable: false })
  content: string;

  @ObjectIdColumn()
  chat: ObjectId;

  @BeforeInsert()
  async beforeInsert(): Promise<void> {
    this.uuid = uuidv4();
  }
}
