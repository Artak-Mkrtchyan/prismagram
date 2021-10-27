import { isAuthenticated } from "../../../middlewares";
import { Context } from '../../../context';

export default {
  Query: {
    seeFeed: async (_: Record<string, unknown>, args: {term: string}, context: Context) => {
      isAuthenticated(context.req);
      const { user } = context.req;
      const following = await context.prisma.user.findUnique({where: { id: user.id }}).following();
      return  context.prisma.post.findMany({
        where: {
          user: {
            id: {in: [...following.map((user) => user.id), user.id],}
          },
        
        },
        orderBy: {createdAt: "desc"},
      });
    },
  },
};
