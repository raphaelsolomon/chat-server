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
    @InjectModel('ChatMessage') private chatMessageModel: Model<IChatMessage>,
  ) {}

  create(
    user_uuid: string,
    client: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  ) {
    client.join(user_uuid.toString());
    console.log('User connected 🗼. userId: ', user_uuid.toString());
    return user_uuid;
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
    const message = await this.chatMessageModel.create({
      sender_uuid: createMessageDto.sender_uuid,
      receiver_uuid: createMessageDto.receiver_uuid,
      content: createMessageDto.content || '',
      chat: selectedChatMessage._id,
    });

    await this.chatModel.findByIdAndUpdate(selectedChatMessage._id, {
      lastMessage: message._id,
    });

    // logic to emit socket event about the new message created to the other participants
    selectedChatMessage.participants.forEach((uuid: string) => {
      if (uuid.toString() === createMessageDto.sender_uuid) return;
      // emit the receive message event to the other participants with received message as the payload
      console.log(s)
      socket
        .in(selectedChatMessage.uuid)
        .emit('receiveMessage', message.toJSON());
    });
    return;
  }

  async findAllChats(user_uuid: string) {
    const chats = await this.chatModel.find({
      participants: { $in: [user_uuid] },
    });
    return chats;
  }

  async getChatMessages(
    user_uuid: string,
    receiver_uuid: string,
    page?: number,
  ) {
    const getChats = await this.chatModel.aggregate([
      {
        $match: {
          isGroupChat: false,
          $and: [
            {
              participants: {
                $elemMatch: { $eq: user_uuid },
              },
            },
            {
              participants: {
                $elemMatch: { $eq: receiver_uuid },
              },
            },
          ],
        },
      },
    ]);

    if (!getChats[0].participants?.includes(receiver_uuid)) {
      throw new Error('User is not a part of this chat');
    }
    const messages = await this.chatMessageModel.aggregate([
      {
        $match: {
          chat: getChats[0]._id,
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
