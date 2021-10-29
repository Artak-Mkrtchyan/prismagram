import { Context } from '../../context';

export default {
  Like: {
    post: ({ id }: { id: string }, args: {}, context: Context) =>
      context.prisma.like.findUnique({ where: { id } }).post(),
    user: ({ id }: { id: string }, args: {}, context: Context) =>
      context.prisma.like.findUnique({ where: { id } }).user(),
  },
};
