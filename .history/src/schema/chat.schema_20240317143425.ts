import * as mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';


export const ChatSchema  = new m{
  
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

  @Column({ nullable: false })
  participants: [string];

  @Column()
  admin: string;

  @BeforeInsert()
  async beforeInsert(): Promise<void> {
    this.uuid = uuidv4();
  }
}
