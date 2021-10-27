import { Context } from "../../../context";
import { isAuthenticated } from "../../../middlewares";

export default {
  Mutation: {
    editUser: async (_: Record<string, unknown>, args: {username: string, email: string,firstName: string, lastName: string, bio: string, avatar: string}, context: Context) => {
      isAuthenticated(context.req);

      const { username, email, firstName, lastName, bio, avatar } = args;
      const { user } = context.req;

      return context.prisma.user.update({
        where: { id: user.id },
        data: {
          username,
          email,
          firstName,
          lastName,
          bio,
          avatar,
        },
      });
    },
  },
};