import { Context } from '../../../context';
import { isAuthenticated } from '../../../middlewares';

export const resolvers = {
  Query: {
    me: async (_: any, __: any, context: Context) => {
      isAuthenticated(context);

      const { user } = context;

      const me = context.prisma.user.findUnique({ where: { id: user.id } });

      return me;
    },
  },
};
