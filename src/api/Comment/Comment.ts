import { Context } from 'src/context';

export const resolvers = {
  Comment: {
    user: ({ id }: { id: string }, args: {}, context: Context) =>
      context.prisma.comment.findUnique({ where: { id } }).user(),
    post: ({ id }: { id: string }, args: {}, context: Context) =>
      context.prisma.comment.findUnique({ where: { id } }).post(),
  },
};
