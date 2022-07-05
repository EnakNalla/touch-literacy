import { WordList } from '@prisma/client';
import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface User extends DefaultUser {
    wordLists: WordList[];
  }

  interface Session {
    user: {
      wordLists: WordList[];
    } & DefaultSession['user'];
  }
}
