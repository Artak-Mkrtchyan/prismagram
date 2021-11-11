import { isAuthenticated } from 'src/middlewares';
import { Context } from 'src/context';

export const resolvers = {
  Mutation: {
    addComment: async (
      _: Record<string, unknown>,
      args: { text: string; postId: string },
      context: Context
    ) => {
      isAuthenticated(context);
      const { text, postId } = args;
      const { user } = context;

      const comment = await context.prisma.comment.create({
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
          text,
        },
      });

      return comment;
    },
  },
};
