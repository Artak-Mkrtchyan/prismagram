import { Context } from '../../../context';

export const resolvers = {
  Mutation: {
    createAccount: async (
      _: Record<string, unknown>,
      args: {
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        bio: string;
      },
      context: Context
    ) => {
      const { username, email, firstName = '', lastName = '', bio = '' } = args;
      const exists = await context.prisma.user.findUnique({
        where: { username },
      });
      if (exists) {
        throw Error('This username / email is already taken');
      }
      await context.prisma.user.create({
        data: {
          username,
          email,
          firstName,
          lastName,
          bio,
        },
      });

      return true;
    },
  },
};
