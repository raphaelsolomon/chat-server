import { Connection } from 'mongoose';
import { CatSchema } from './schemas/c';

export const catsProviders = [
  {
    provide: 'CHAT_MODEL',
    useFactory: (connection: Connection) => connection.model('Cat', CatSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];