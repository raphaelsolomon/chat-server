import { Entity } from "typeorm";

@Entity()
export class Message {
  sender_uuid: string;
  receiver_uuid: string;
  message: string;
  message_type?: string;
}
