import { isAuthenticated } from 'src/middlewares';
import { Context } from 'src/context';

export const resolvers = {
  Mutation: {
    upload: async (
      _: Record<string, unknown>,
      args: { caption: string; files: string[]; location: string },
      context: Context
    ) => {
      isAuthenticated(context);
      const { user } = context;
      const { caption, files, location } = args;
      const post = await context.prisma.post.create({
        data: {
          user: { connect: { id: user.id } },
          caption,
          location,
        },
      });
      files.forEach(async (file) =>
        context.prisma.file.create({
          data: {
            url: file,
            post: {
              connect: {
                id: post.id,
              },
            },
          },
        })
      );

      return post;
    },
  },
};
