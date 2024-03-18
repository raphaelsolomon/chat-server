/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  messages: Message[] = [{sender_uuid:}]
  create(createMessageDto: CreateMessageDto) {
    return 'This action adds a new message';
  }

  findAll() {
    return `This action returns all messages`;
  }
}
