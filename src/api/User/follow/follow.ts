import { isAuthenticated } from '../../../middlewares';
import { Context } from '../../../context';

export const resolvers = {
  Mutation: {
    follow: async (
      _: Record<string, unknown>,
      args: { id: string },
      context: Context
    ) => {
      isAuthenticated(context);
      const { id } = args;
      const { user } = context;

      try {
        await context.prisma.user.update({
          where: { id: user.id },
          data: {
            following: {
              connect: {
                id,
              },
            },
          },
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
