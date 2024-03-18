import { Module } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    
    MessagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
