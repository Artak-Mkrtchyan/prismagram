import { isAuthenticated } from 'src/middlewares';
import { Context } from 'src/context';
import { logger } from 'src/logger';

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
        logger.error(error);
        return false;
      }
    },
  },
};
