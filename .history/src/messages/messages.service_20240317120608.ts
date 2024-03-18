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
    let selectedChatMessage: Chat;

    selectedChatMessage = await this.chat.findOne({
      where: { uuid: createMessageDto?.chat },
    });

    if (!selectedChatMessage) {
      const newChatInstance = this.chat.create({
        name: 'p2p',
        participants: [
          createMessageDto.sender_uuid,
          createMessageDto.receiver_uuid,
        ],
        admin: createMessageDto.sender_uuid,
      });

      // Create a new message instance with appropriate metadata
      const message = await ChatMessage.create({
        sender: new mongoose.Types.ObjectId(req.user._id),
        content: content || '',
        chat: new mongoose.Types.ObjectId(chatId),
        attachments: messageFiles,
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