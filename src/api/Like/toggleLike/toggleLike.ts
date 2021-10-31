import { isAuthenticated } from '../../../middlewares';
import { Context } from '../../../context';

export const resolvers = {
  Mutation: {
    toggleLike: async (
      _: Record<string, unknown>,
      args: { postId: string },
      context: Context
    ) => {
      isAuthenticated(context);
      const { postId } = args;
      const { user } = context.req;

      const filterOptions = {
        where: {
          AND: [
            {
              user: {
                id: user.id,
              },
            },
            {
              post: {
                id: postId,
              },
            },
          ],
        },
      };
      try {
        const existingLike = await context.prisma.like.findMany(filterOptions);

        if (existingLike) {
          await context.prisma.like.deleteMany(filterOptions);
        } else {
          await context.prisma.like.create({
            data: {
              user: {
                connect: {
                  id: user.id,
                },
              },
              post: {
                connect: {
                  id: postId,
                },
              },
            },
          });
        }
        return true;
      } catch (error) {
        return false;
      }
    },
  },
};
