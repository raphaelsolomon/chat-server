import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Ch])]
  providers: [MessagesGateway, MessagesService],
})
export class MessagesModule {}
