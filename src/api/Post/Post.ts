import { Context } from '../../context';

export default {
  Post: {
    isLiked: async (parent: any, _: any, context: Context) => {
      const { user } = context.req;
      const { id } = parent;

      return context.prisma.like.findMany({
        where: {
          AND: [
            { user: { id: user.id } },
            {
              post: {
                id,
              },
            },
          ],
        },
      });
    },
    likeCount: ({ id }: { id: string }, _: any, context: Context) =>
      context.prisma.like.count({
        where: {
          post: { id },
        },
      }),
    commentCount: ({ id }: { id: string }, _: any, context: Context) =>
      context.prisma.comment.count({
        where: {
          post: { id },
        },
      }),
    files: ({ id }: { id: string }, _: any, context: Context) =>
      context.prisma.post.findUnique({ where: { id } }).files(),
    comments: ({ id }: { id: string }, _: any, context: Context) =>
      context.prisma.post.findUnique({ where: { id } }).comments(),
    user: ({ id }: { id: string }, _: any, context: Context) =>
      context.prisma.post.findUnique({ where: { id } }).user(),
  },
};
