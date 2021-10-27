
import { Context } from "../../../context";
import { isAuthenticated } from "../../../middlewares";

export default {
  Query: {
    me: async (_: any, __: any, context: Context) => {
      isAuthenticated(context.req);

      const { user } = context.req;
      return await context.prisma.user.findUnique({where: { id: user.id }});
    },
  },
};
