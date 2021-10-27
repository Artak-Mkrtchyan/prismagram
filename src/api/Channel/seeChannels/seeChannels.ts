import { isAuthenticated } from "../../../middlewares";
import { Context } from '../../../context';

export default {
  Query: {
    seeChannels: (_: Record<string, unknown>, args: {}, context: Context) => {
      isAuthenticated(context.req);
      const { user } = context.req;
      return context.prisma.channel.findMany({
        where: {
          participants: {some: {
            id: user.id,
          },
        },}
      });
    },
  },
};
