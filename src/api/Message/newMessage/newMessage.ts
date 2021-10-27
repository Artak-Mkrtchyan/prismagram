import { Context } from "../../../context";

export default {
  Mutation: {
    newMessage: {
      subscribe: (_: Record<string, unknown>, args: { channelId: string}, context: Context) => {
        const { channelId } = args;
        return context.prisma.message.findMany({
          where: 
              {
                channel: { id: channelId },
                }
          })
         ;
      },
    },
  },
};
