import { Context } from 'src/context';

export const resolvers = {
  Query: {
    seeFullPost: async (
      _: Record<string, unknown>,
      args: { id: string },
      context: Context
    ) => {
      const { id } = args;
      return context.prisma.post.findUnique({ where: { id } });
    },
  },
};
