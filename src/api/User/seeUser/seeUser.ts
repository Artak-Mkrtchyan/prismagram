import { Context } from '../../../context';

export const resolvers = {
  Query: {
    seeUser: async (
      _: Record<string, unknown>,
      args: { username: string },
      context: Context
    ) => {
      const { username } = args;
      // console.log('username', username);
      try {
        const user = await context.prisma.user.findUnique({
          where: { username },
        });
        // console.log(user);
        return user;
      } catch (e) {
        console.log(e);
        return null;
      }
    },
  },
};
