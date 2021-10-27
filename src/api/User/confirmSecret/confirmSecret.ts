import { Context } from "../../../context";
import { generateToken } from "../../../utils";

export default {
  Mutation: {
    confirmSecret: async (_: Record<string, unknown>, args: {email: string, secret: string}, context: Context) => {
      const { email, secret } = args;
       
      const user = await context.prisma.user.findUnique({ where: {email} });
      
      if (user?.loginSecret === secret) {
        await context.prisma.user.update({
          where: {
            id: user.id
          },
          data: {
            loginSecret: ""
          }
        });
         
        return generateToken(user.id);
      } else {
        throw Error("Wrong email/secret combination ");
      }
    }
  }
};
