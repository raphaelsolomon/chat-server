import { Module } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './messages/entities/chat.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost:27017/chatDB',
      entities: [Chat],
    }),
    MessagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
