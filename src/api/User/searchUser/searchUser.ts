import { Context } from 'src/context';

export const resolvers = {
  Query: {
    searchUser: async (
      _: Record<string, unknown>,
      args: { term: string },
      context: Context
    ) =>
      context.prisma.user.findMany({
        where: {
          OR: [
            { username: { contains: args.term } },
            { firstName: { contains: args.term } },
            { lastName: { contains: args.term } },
          ],
        },
      }),
  },
};
