/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { ChatMessage } from './entities/chatmessage.entity';
import mongoose from 'mongoose';

@Injectable()
export class MessagesService {
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

  async createMessage(createMessageDto: CreateMessageDto) {
    const selectedChat = await this.chat.findOne({
      where: { uuid: createMessageDto.uuid },
    });

    if (!selectedChat) {
      throw new Error('Chat does not exist');
    }

    const message = await this.chatMessage.create({
      sender_uuid: createMessageDto.sender_uuid,
      content: createMessageDto.content || '',
      chat: createMessageDto.chat,
    });

    await this.chat.findb

    // this.messages.push({});
    return message;
  }

  async findAllChats(
    client: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  ) {
    const chats = await this.chat.find({
      participants: { $in: [client['user_uuid']] },
    });

    return chats;
  }

  async getChatMessages(chatId: string, receiver_uuid: string, page?: number) {
    const selectedChat = await this.chat.findOne({ where: { uuid: chatId } });

    if (!selectedChat.participants?.includes(receiver_uuid)) {
      throw new Error('User is not a part of this chat');
    }
    const messages = await this.chatMessage.aggregate([
      {
        $match: {
          chat: selectedChat.uuid,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    return messages || [];
  }

  identify(name: string, id: string) {
    this.clientToUser[id] = name;
    return Object.values(this.clientToUser);
  }

  getClientName(clientId: string) {
    return this.clientToUser[clientId];
  }
}
