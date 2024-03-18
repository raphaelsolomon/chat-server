import { Module } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessage } from './messages/entities/chatmessage.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost:27017/chatDB',
      entities: [ChatMessage, C],
    }),
    MessagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
