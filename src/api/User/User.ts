import { Context } from 'src/context';

export const resolvers = {
  User: {
    posts: (
      { id }: { id: string },
      args: Record<string, unknown>,
      context: Context
    ) => context.prisma.user.findUnique({ where: { id } }).posts(),
    following: (
      { id }: { id: string },
      args: Record<string, unknown>,
      context: Context
    ) => context.prisma.user.findUnique({ where: { id } }).following(),
    followers: (
      { id }: { id: string },
      args: Record<string, unknown>,
      context: Context
    ) => context.prisma.user.findUnique({ where: { id } }).followers(),
    likes: (
      { id }: { id: string },
      args: Record<string, unknown>,
      context: Context
    ) => context.prisma.user.findUnique({ where: { id } }).likes(),
    comments: (
      { id }: { id: string },
      args: Record<string, unknown>,
      context: Context
    ) => context.prisma.user.findUnique({ where: { id } }).comments(),
    channels: (
      { id }: { id: string },
      args: Record<string, unknown>,
      context: Context
    ) => context.prisma.user.findUnique({ where: { id } }).channels(),
    postsCount: (
      { id }: { id: string },
      args: Record<string, unknown>,
      context: Context
    ) => context.prisma.post.count({ where: { user: { id } } }),

    followingCount: (
      { id }: { id: string },
      args: Record<string, unknown>,
      context: Context
    ) => context.prisma.user.count({ where: { followers: { some: { id } } } }),

    followersCount: (
      { id }: { id: string },
      args: Record<string, unknown>,
      context: Context
    ) => context.prisma.user.count({ where: { following: { none: { id } } } }),
    fullName: (parent: any) => `${parent.firstName} ${parent.lastName}`,
    isFollowing: async ({ id }: { id: string }, _: any, context: Context) => {
      const { user } = context;
      try {
        const followers = await context.prisma.user.findMany({
          where: {
            id: user.id,
            following: { some: { id } },
          },
        });
        return followers !== [];
      } catch (err) {
        return err;
      }
    },
    isSelf: (parent: Record<string, unknown>, _: any, context: Context) => {
      const { user } = context;
      const { id: parentId } = parent;
      return user.id === parentId;
    },
  },
};
