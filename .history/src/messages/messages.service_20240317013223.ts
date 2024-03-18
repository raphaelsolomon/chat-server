/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  messages: [];
  clientToUser = {};

  create(createMessageDto: CreateMessageDto) {
    const message = { ...createMessageDto };
    // this.messages.push({});
    return message;
  }

  findAll() {
    return this.
  }

  identify(name: string, id: string) {
    this.clientToUser[id] = name;
    return Object.values(this.clientToUser);
  }

  getClientName(clientId: string) {
    return this.clientToUser[clientId];
  }
}
