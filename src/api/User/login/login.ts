import bcrypt from 'bcrypt';
import { UserInputError } from 'apollo-server-errors';
import { Context } from 'src/context';
import { generateToken } from 'src/utils';

export const resolvers = {
  Mutation: {
    login: async (
      _: Record<string, unknown>,
      args: { email: string; password: string },
      context: Context
    ) => {
      const { email, password } = args;

      try {
        const user = await context.prisma.user.findUnique({ where: { email } });

        if (!user) {
          throw new UserInputError('User not found');
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        console.log(isMatch);
        if (isMatch) {
          const token = generateToken(user.id);

          return token;
        }
        throw Error('Wrong email/secret combination ');
      } catch (error) {
        throw Error(`Wrong email/secret combination: ${error}`);
      }
    },
  },
};
