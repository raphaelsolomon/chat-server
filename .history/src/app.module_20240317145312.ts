import { Module } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import { DatabaseModule } from './database/database.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot(''), MessagesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
