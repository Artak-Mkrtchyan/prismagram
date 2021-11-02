import { isAuthenticated } from '../../../middlewares';
import { Context } from '../../../context';

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
              id: '617451b3ed8c38a1185fc7cc',
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
