import { Connection } from 'mongoose';
import { ChatSchema } from './chat.schema';

export const catsProviders = [
  {
    provide: 'CHAT_MESSAGE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('chatmessage', ChatSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
