import { Context } from 'src/context';

export const resolvers = {
  Like: {
    post: (
      { id }: { id: string },
      args: Record<string, unknown>,
      context: Context
    ) => context.prisma.like.findUnique({ where: { id } }).post(),
    user: (
      { id }: { id: string },
      args: Record<string, unknown>,
      context: Context
    ) => context.prisma.like.findUnique({ where: { id } }).user(),
  },
};
