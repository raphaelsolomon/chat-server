import { Connection } from 'mongoose';
import { ChatSchema } from './chat.schema';

export const catsProviders = [
  {
    provide: 'CHAT_MODEL',
    useFactory: (connection: Connection) => connection.model('Chat', ChatSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
