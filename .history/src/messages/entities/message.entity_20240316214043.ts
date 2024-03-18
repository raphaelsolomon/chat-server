import {
  BeforeInsert,
  Column,
  Entity,
  ObjectId,
  ObjectIdColumn,
} from 'typeorm';
export class Message {
  sender_uuid: string;
  receiver_uuid: string;
  message: string;
  message_type?: string;
}
