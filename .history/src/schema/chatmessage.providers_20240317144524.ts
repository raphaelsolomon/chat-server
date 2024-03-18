import { Connection } from 'mongoose';
import { ChatMessageSchema } from './chatmessage.schema';

export const catsProviders = [
  {
    provide: 'CHAT_MESSAGE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('chatmessage', ChatSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
