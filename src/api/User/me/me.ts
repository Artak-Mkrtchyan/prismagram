import { Context } from 'src/context';
import { isAuthenticated } from 'src/middlewares';

export const resolvers = {
  Query: {
    me: async (_: any, __: any, context: Context) => {
      try {
        isAuthenticated(context);

        const { user } = context;

        const me = await context.prisma.user.findUnique({
          where: { id: user.id },
        });

        return me;
      } catch (e) {
        return e;
      }
    },
  },
};
