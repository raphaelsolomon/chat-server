import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './messages/entities/chat.entity';
import { ChatMessage } from './messages/entities/chatmessage.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'testdb',
      synchronize: true,
      entities: [Chat, ChatMessage],
    }),
    MessagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
