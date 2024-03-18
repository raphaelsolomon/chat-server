import {
  BeforeInsert,
  Column,
  Entity,
  ObjectId,
  ObjectIdColumn,
} from 'typeorm';

@Entity()
export class ChatMessage {
  constructor(chatMessage?: Partial<ChatMessage>) {
    Object.assign(this, chatMessage);
  }
  @ObjectIdColumn()
  id: ObjectId;

  @Co

  @Column({ nullable: false })
  sender_uuid: string;

  @Column({ nullable: false })
  content: string;

  @ObjectIdColumn()
  chat: ObjectId;
}
