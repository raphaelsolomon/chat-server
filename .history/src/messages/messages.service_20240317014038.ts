/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

@Injectable()
export class MessagesService {
  create(user_uuid: string, client: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
    client
  }
  messages: [];
  clientToUser = {};

  createMessage(createMessageDto: CreateMessageDto) {
    const message = { ...createMessageDto };
    // this.messages.push({});
    return message;
  }

  findAll() {
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
