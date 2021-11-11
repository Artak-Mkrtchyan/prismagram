import bcrypt from 'bcrypt';
import { Context } from 'src/context';

export const resolvers = {
  Mutation: {
    createAccount: async (
      _: Record<string, unknown>,
      args: {
        username: string;
        password: string;
        email: string;
        firstName: string;
        lastName: string;
        bio: string;
      },
      context: Context
    ) => {
      const {
        username,
        password,
        email,
        firstName = '',
        lastName = '',
        bio = '',
      } = args;
      const exists = await context.prisma.user.findUnique({
        where: { username },
      });
      if (exists) {
        throw Error('This username / email is already taken');
      }

      const passwordHash = await bcrypt.hashSync(password, 10);

      await context.prisma.user.create({
        data: {
          username,
          password: passwordHash,
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
