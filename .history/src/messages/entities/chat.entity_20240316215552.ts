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
  constructor(chat?: Partial<Chat>) {
    Object.assign(this, chat);
  }
  @ObjectIdColumn()
  id: ObjectId;

  @Column({ nullable: false })
  uuid: string;

  @Column({ nullable: false })
  name: string;

  @Column({ default: false })
  isGroupChat: boolean;

  @ObjectIdColumn()
  lastMessage: ObjectId;

  @ObjectIdColumn()
  participants: [ObjectId];

  @Column()
  admin: string;

  @BeforeInsert()
  async beforeInsert(): Promise<void> {
    this.uuid = uuidv4();
  }
}
