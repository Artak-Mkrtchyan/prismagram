import { Context } from '../../../context';

export const resolvers = {
  Query: {
    seeUser: async (
      _: Record<string, unknown>,
      args: { username: string },
      context: Context
    ) => {
      const { username } = args;

      return context.prisma.user.findUnique({ where: { username } });
    },
  },
};
