import {
  BeforeInsert,
  Column,
  Entity,
  ObjectId,
  ObjectIdColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Message {

    constructor(chatMessage?:  Partial<Message)
  sender_uuid: string;
  receiver_uuid: string;
  message: string;
  message_type?: string;
}
