import { Context } from '../../../context';
import { generateSecret, sendSecretMail } from '../../../utils';
export default {
  Mutation: {
    requestSecret: async (
      _: Record<string, unknown>,
      args: { email: string },
      context: Context
    ) => {
      const { email } = args;
      const loginSecret = generateSecret();
      try {
        console.log('email', email, loginSecret);
        // if you want to get email set the sgTransport options
        // await sendSecretMail(email, loginSecret);
        await context.prisma.user.update({
          data: { loginSecret },
          where: { email },
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
