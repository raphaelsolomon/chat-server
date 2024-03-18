import { Module } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule
    MessagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
