import { Context } from '../../../context';
import { isAuthenticated } from '../../../middlewares';

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
