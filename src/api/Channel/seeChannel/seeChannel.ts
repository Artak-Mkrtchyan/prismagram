import { isAuthenticated } from '../../../middlewares';
import { Context } from '../../../context';

export default {
  Query: {
    seeChannel: async (
      _: Record<string, unknown>,
      args: { id: string },
      context: Context
    ) => {
      isAuthenticated(context.req);
      const { id } = args;
      const { user } = context.req;
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
