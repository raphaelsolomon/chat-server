import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessage } from './entities/chatmessage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessage, ])]
  providers: [MessagesGateway, MessagesService],
})
export class MessagesModule {}
