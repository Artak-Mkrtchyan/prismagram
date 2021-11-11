import { Context } from 'src/context';

export const resolvers = {
  Post: {
    isLiked: async (
      parent: { id: string },
      args: Record<string, unknown>,
      context: Context
    ) => {
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

      return like === [];
    },
    likeCount: (
      { id }: { id: string },
      args: Record<string, unknown>,
      context: Context
    ) =>
      context.prisma.like.count({
        where: {
          post: { id },
        },
      }),
    commentCount: (
      { id }: { id: string },
      args: Record<string, unknown>,
      context: Context
    ) =>
      context.prisma.comment.count({
        where: {
          post: { id },
        },
      }),
    files: (
      { id }: { id: string },
      args: Record<string, unknown>,
      context: Context
    ) => context.prisma.post.findUnique({ where: { id } }).files(),
    comments: (
      { id }: { id: string },
      args: Record<string, unknown>,
      context: Context
    ) => context.prisma.post.findUnique({ where: { id } }).comments(),
    user: (
      { id }: { id: string },
      args: Record<string, unknown>,
      context: Context
    ) => context.prisma.post.findUnique({ where: { id } }).user(),
  },
};
