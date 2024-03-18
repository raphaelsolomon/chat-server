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
  constructor(
    @InjectRepository(Chat) private chat: MongoRepository<Chat>,
    @InjectRepository(ChatMessage)
    private chatMessage: MongoRepository<ChatMessage>,
  ) {}

  create(
    user_uuid: string,
    client: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  ) {
    client['user_uuid'] = user_uuid;
    client.join(user_uuid.toString());
    console.log('User connected 🗼. userId: ', user_uuid.toString());
    return client['user_uuid'];
  }

  async createMessage(
    createMessageDto: CreateMessageDto,
    client: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  ) {
    const getChat = await this.chat.aggregate([
      {
        $match: {
          isGroupChat: false,
          $and: [
            {
              participants: {
                $elemMatch: { $eq: createMessageDto.sender_uuid },
              },
            },
            {
              participants: {
                $elemMatch: { $eq: createMessageDto.receiver_uuid },
              },
            },
          ],
        },
      },
    ]);
    const chats = await selectedChatMessage.toArray();

    if (chats.length) {

    }
    if (selectedChatMessage.length) {
      selectedChatMessage = this.chat.create({
        name: 'p2p',
        participants: [
          createMessageDto.sender_uuid,
          createMessageDto.receiver_uuid,
        ],
        admin: createMessageDto.sender_uuid,
      });

      // Create a new message instance with appropriate metadata
      const message = this.chatMessage.create({
        sender_uuid: createMessageDto.sender_uuid,
        content: createMessageDto.content || '',
        chat: selectedChatMessage.uuid,
      });
    }
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
}
