import { Context } from 'src/context';
import { generateSecret, sendSecretMail } from 'src/utils';

export const resolvers = {
  Mutation: {
    requestSecret: async (
      _: Record<string, unknown>,
      args: { email: string },
      context: Context
    ) => {
      const { email } = args;
      const loginSecret = generateSecret();
      try {
        await context.prisma.user.update({
          data: { loginSecret },
          where: { email },
        });
        return true;
      } catch (error) {
        return false;
      }
    },
  },
};
