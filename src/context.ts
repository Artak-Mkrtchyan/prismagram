import './env';

import { PrismaClient } from '@prisma/client';
import { AuthenticationError } from 'apollo-server-errors';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  req: any; // HTTP request carrying the `Authorization` header;
  user: any;
}

export const getUser = async (token: string) => {
  try {
    if (!token) {
      return null;
    }

    const SECRET = process.env.JWT_SECRET as string;
    const { id } = (await jwt.verify(token, SECRET)) as Record<string, string>;

    const user = await prisma.user.findUnique({ where: { id } });

    if (user) {
      return user;
    }

    return null;
  } catch (e) {
    return null;
  }
};

export async function createContext(context: any) {
  const token = context.req.headers.token || '';
  const user = await getUser(token);

  return {
    ...context,
    user,
    prisma,
  };
}
