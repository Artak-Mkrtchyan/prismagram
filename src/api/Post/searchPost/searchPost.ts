import { Context } from '../../../context';


export default {
  Query: {
    searchPost: async (_: Record<string, unknown>, args: {term: string}, context: Context) => {
      return context.prisma.post.findMany({
        where: {
          OR: [
            {
              location: {
                startsWith: args.term
              }
            },
            {
              caption: {
                startsWith: args.term
              }
            }
          ]
        }
      })
    }
  }
};
