import { Context } from 'src/context';
import { isAuthenticated } from 'src/middlewares';

export const resolvers = {
  Mutation: {
    sendMessage: async (
      _: Record<string, unknown>,
      args: { channelId?: string; message: string; toId?: string },
      context: Context
    ) => {
      isAuthenticated(context);
      const { user } = context;
      const { channelId, message, toId } = args;
      let channel;
      if (channelId === undefined) {
        if (user.id !== toId) {
          channel = await context.prisma.channel.create({
            data: {
              participants: {
                connect: [{ id: toId }, { id: user.id }],
              },
            },
          });
        }
      } else {
        channel = await context.prisma.channel.findUnique({
          where: { id: channelId },
        });
      }
      if (!channel) {
        throw Error('channel not found');
      }
      return context.prisma.message.create({
        data: {
          text: message,
          user: {
            connect: { id: user.id },
          },
          channel: {
            connect: {
              id: channel.id,
            },
          },
        },
      });
    },
  },
};
