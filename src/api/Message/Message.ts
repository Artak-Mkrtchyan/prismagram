import { Context } from 'src/context';

export const resolvers = {
  Message: {
    channel: ({ id }: { id: string }, args: {}, context: Context) =>
      context.prisma.message.findUnique({ where: { id } }).channel(),
    user: ({ id }: { id: string }, args: {}, context: Context) =>
      context.prisma.message.findUnique({ where: { id } }).user(),
  },
};
