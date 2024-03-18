/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { ChatMessage } from './entities/chatmessage.entity';

@Injectable()
export class MessagesService {
  messages: [];

  constructor(
    @InjectRepository(Chat) private chat: MongoRepository<Chat>,
    @InjectRepository(ChatMessage)
    private chatMessage: MongoRepository<ChatMessage>,
  ) {}

  clientToUser = {};

  create(
    user_uuid: string,
    client: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  ) {
    client['user_uuid'] = user_uuid;
    client.join(user_uuid.toString());
    console.log('User connected 🗼. userId: ', user_uuid.toString());
    return client['user_uuid'];
  }

  createMessage(createMessageDto: CreateMessageDto) {
    const message = { ...createMessageDto };
    // this.messages.push({});
    return message;
  }

  findAll() {
    const chats = this.chat.find({participants: ]})
    return this.messages;
  }

  identify(name: string, id: string) {
    this.clientToUser[id] = name;
    return Object.values(this.clientToUser);
  }

  getClientName(clientId: string) {
    return this.clientToUser[clientId];
  }
}
