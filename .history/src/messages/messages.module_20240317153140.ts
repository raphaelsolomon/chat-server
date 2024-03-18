import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from './schema/chat.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Chat',
        schema: ChatSchema,
      },
    ]),
  ],
  providers: [MessagesGateway, MessagesService],
})
export class MessagesModule {}
