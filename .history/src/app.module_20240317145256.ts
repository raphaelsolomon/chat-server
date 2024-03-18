import { Module } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [Mongoose, MessagesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
