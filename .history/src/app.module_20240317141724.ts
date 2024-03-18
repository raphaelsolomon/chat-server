import { Module } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost:27017/chatDB',
      entities: [Cha],
    }),
    MessagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
