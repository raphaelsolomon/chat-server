import { Connection } from 'mongoose';
import { ChatMessage } from './chatmessage.schema';

export const chatsProviders = [
  {
    provide: 'CHAT_MESSAGE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('chatmessage', ChatMessage),
    inject: ['DATABASE_CONNECTION'],
  },
];
