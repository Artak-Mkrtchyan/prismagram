import { Context } from '../../context';

export const resolvers = {
  Post: {
    isLiked: async (parent: any, _: any, context: Context) => {
      const { user } = context;
      const { id } = parent;

      const like = await context.prisma.like.findMany({
        where: {
          user: { id: user.id },
          post: {
            id,
          },
        },
      });

      return like !== [];
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
