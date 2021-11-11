import { isAuthenticated } from 'src/middlewares';
import { Context } from 'src/context';
import { logger } from 'src/logger';

enum Action {
  EDIT = 'EDIT',
  DELETE = 'DELETE',
}

export const resolvers = {
  Mutation: {
    editPost: async (
      _: Record<string, unknown>,
      args: { id: string; caption: string; location: string; action: Action },
      context: Context
    ) => {
      isAuthenticated(context);
      const { id, caption, location, action } = args;

      // const { user } = context;
      const post = await context.prisma.post.findUnique({ where: { id } });

      try {
        if (post) {
          if (action === Action.EDIT) {
            return await context.prisma.post.update({
              data: { caption, location },
              where: { id },
            });
          }
          if (action === Action.DELETE) {
            return await context.prisma.post.delete({ where: { id } });
          }
        } else {
          throw Error("You can't do that");
        }
      } catch (e) {
        logger.error(e);
      }
      return post;
    },
  },
};
