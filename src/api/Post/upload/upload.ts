import { isAuthenticated } from "../../../middlewares";
import { Context } from '../../../context';

export default {
  Mutation: {
    upload: async (_: Record<string, unknown>, args: {caption: string, files: string[], location: string}, context: Context) => {
      isAuthenticated(context.req);
      const { user } = context.req;
      const { caption, files, location } = args;
      const post = await context.prisma.post.create({
        data: {
        user: { connect: { id: user.id } },
        caption,
        location}
      });
      files.forEach(
        async (file) =>
          await await context.prisma.file.create({
            data: {
            url: file,
            post: {
              connect: {
                id: post.id,
              },
            },
          }
          })
      );

      return post;
    },
  },
};