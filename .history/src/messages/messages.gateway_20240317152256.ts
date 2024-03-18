import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('create')
  async create(
    @MessageBody('user_uuid') user_uuid: string,
    @ConnectedSocket() client: Socket,
  ) {
    return this.messagesService.create(user_uuid, client);
  }

  @SubscribeMessage('createMessage')
  async createMessage(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    return this.messagesService.createMessage(createMessageDto, client);
  }

  @SubscribeMessage('getAllChats')
  getAllChats(@ConnectedSocket() client: Socket) {
    return this.messagesService.findAllChats(client);
  }

  @SubscribeMessage('getChatMessages')
  getChatMessages(@MessageBody() body: Record<string, any>) {
    return this.messagesService.getChatMessages(
      body.chatId,
      body.receiver_uuid,
    );
  }
}
