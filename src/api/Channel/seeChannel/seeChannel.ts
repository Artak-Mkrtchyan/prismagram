import { isAuthenticated } from 'src/middlewares';
import { Context } from 'src/context';

export const resolvers = {
  Query: {
    seeChannel: async (
      _: Record<string, unknown>,
      args: { id: string },
      context: Context
    ) => {
      isAuthenticated(context);
      const { id } = args;
      const { user } = context;
      const canSee = await context.prisma.channel.findFirst({
        where: {
          participants: {
            some: {
              id: user.id,
            },
          },
        },
      });
      if (canSee) {
        return context.prisma.channel.findUnique({ where: { id } });
      }
      throw Error("You can't see this");
    },
  },
};
