/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IChat } from './interfaces/chat.interface';
import { IChatMessage } from './interfaces/chatmessage.interface';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel('Chat') private readonly chatModel: Model<IChat>,
    @Inject('ChatMessage') private chatMessageModel: Model<IChatMessage>,
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
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  ) {
    let selectedChatMessage = undefined;
    const getChat = await this.chatModel.aggregate([
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

    if (getChat.length) {
      selectedChatMessage = getChat[0];
    } else {
      selectedChatMessage = await this.chatModel.create({
        name: 'p2p',
        participants: [
          createMessageDto.sender_uuid,
          createMessageDto.receiver_uuid,
        ],
        admin: createMessageDto.sender_uuid,
      });
      socket.join(selectedChatMessage.uuid);
    }

    // Create a new message instance with appropriate metadata
    const message = this.chatMessageModel.create({
      sender_uuid: createMessageDto.sender_uuid,
      content: createMessageDto.content || '',
      chat: selectedChatMessage.uuid,
    });

    // logic to emit socket event about the new message created to the other participants
    selectedChatMessage.participants.forEach((uuid) => {
      if (uuid.toString() === createMessageDto.sender_uuid) return;
      // emit the receive message event to the other participants with received message as the payload
      socket.in(selectedChatMessage.uuid).emit('receiveMessage', message);
    });
    return;
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
    const selectedChat = await this.chatModel.findOne({
      where: { uuid: chatId },
    });

    if (!selectedChat.participants?.includes(receiver_uuid)) {
      throw new Error('User is not a part of this chat');
    }
    const messages = await this.chatMessageModel.aggregate([
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
