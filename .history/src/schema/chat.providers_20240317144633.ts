import { Connection } from 'mongoose';
import { ChatSchema } from './chat.schema';

export const chatProviders = [
  {
    provide: 'CHAT_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('chats', ChatSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
