import { Context } from 'src/context';
import { generateToken } from 'src/utils';

export const resolvers = {
  Mutation: {
    confirmSecret: async (
      _: Record<string, unknown>,
      args: { email: string; secret: string },
      context: Context
    ) => {
      const { email, secret } = args;

      const user = await context.prisma.user.findUnique({ where: { email } });

      if (user?.loginSecret === secret) {
        await context.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            loginSecret: '',
          },
        });
        const token = generateToken(user.id);

        return token;
      }
      throw Error('Wrong email/secret combination ');
    },
  },
};
