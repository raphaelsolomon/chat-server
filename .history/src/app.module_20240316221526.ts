import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'testdb',
      synchronize: true,
      entities: [User],
    }),
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
