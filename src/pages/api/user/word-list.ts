import { PrismaClient, WordList } from '@prisma/client';
import { NextApiHandler } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

const handler: NextApiHandler = async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: 'Unauthorised' });

  const prisma = new PrismaClient();
  const wordList = JSON.parse(req.body) as WordList;

  switch (req.method) {
    case 'POST': {
      const user = await prisma.user.update({
        where: { email: session.user.email! },
        data: {
          wordLists: {
            push: wordList
          }
        }
      });

      return res.status(201).json(user.wordLists);
    }
    case 'PUT': {
      const user = await prisma.user.update({
        where: { email: session.user.email! },
        data: {
          wordLists: {
            updateMany: {
              where: { name: wordList.name },
              data: {
                list: wordList.list
              }
            }
          }
        }
      });

      return res.status(200).json(user.wordLists);
    }
    case 'DELETE': {
      const user = await prisma.user.update({
        where: { email: session.user.email! },
        data: {
          wordLists: {
            deleteMany: {
              where: { name: wordList.name }
            }
          }
        }
      });

      return res.status(200).json(user.wordLists);
    }
    default: {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  }
};

export default handler;
