import { Context } from '../../../context';

export default {
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
