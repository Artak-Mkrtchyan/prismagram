import { Context } from '../../../context';

export const resolvers = {
  Query: {
    seeUser: async (
      _: Record<string, unknown>,
      args: { username: string },
      context: Context
    ) => {
      const { username } = args;

      try {
        const user = await context.prisma.user.findUnique({
          where: { username },
        });

        return user;
      } catch (e) {
        console.log(e);
        return null;
      }
    },
  },
};
