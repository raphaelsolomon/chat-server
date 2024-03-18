import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
@Module({
  imports: [M],
  providers: [MessagesGateway, MessagesService],
})
export class MessagesModule {}
