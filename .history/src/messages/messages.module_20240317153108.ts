import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [MongooseModule.forFeature([])],
  providers: [MessagesGateway, MessagesService],
})
export class MessagesModule {}
