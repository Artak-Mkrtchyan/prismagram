import { Context } from 'src/context';

export const resolvers = {
  Channel: {
    participants: ({ id }: { id: string }, args: {}, context: Context) =>
      context.prisma.channel.findUnique({ where: { id } }).participants(),
    messages: ({ id }: { id: string }, args: {}, context: Context) =>
      context.prisma.channel.findUnique({ where: { id } }).messages(),
  },
};
