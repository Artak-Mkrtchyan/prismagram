import './env';

import { PrismaClient } from '@prisma/client';
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
    const user = (await jwt.verify(
      token.replace('Bearer ', ''),
      SECRET
    )) as Record<string, string>;

    if (user) {
      return user;
    }

    return null;
  } catch (e) {
    return null;
  }
};

export async function createContext(context: any) {
  const token = context.req.headers.authorization || '';

  const user = await getUser(token);

  return {
    ...context,
    user,
    prisma,
  };
}
