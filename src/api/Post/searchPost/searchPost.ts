import { Context } from 'src/context';

export const resolvers = {
  Query: {
    searchPost: async (
      _: Record<string, unknown>,
      args: { term: string },
      context: Context
    ) =>
      context.prisma.post.findMany({
        where: {
          OR: [
            {
              location: {
                startsWith: args.term,
              },
            },
            {
              caption: {
                startsWith: args.term,
              },
            },
          ],
        },
      }),
  },
};
