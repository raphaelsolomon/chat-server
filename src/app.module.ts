import { Module } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/chatDB'),
    MessagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
