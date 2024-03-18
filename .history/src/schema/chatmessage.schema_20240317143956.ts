import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export const ChatMessage =  new mongoose.Schema ({
 
  uuid: {
    type: String,
    default: uuidv4
  },
  
  
  sender_uuid: {
    type: String,
    required
  };
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
