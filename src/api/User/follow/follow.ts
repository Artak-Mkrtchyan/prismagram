import { isAuthenticated } from "../../../middlewares";
import { Context } from "../../../context";

export default {
  Mutation: {
    follow: async (_: Record<string, unknown>, args: {id: string}, context: Context) => {
      isAuthenticated(context.req);

      const { id } = args;
      const { user } = context.req;

      try {
        await context.prisma.user.update({
          where: { id: user.id },
          data: {
            following: {
              connect: {
                id
              }
            }
          }
        });
        return true;
      } catch (error) {
        return false;
      }
    }
  }
};
