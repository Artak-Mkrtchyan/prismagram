import { Context } from '../../context';

export default {
  Channel: {
    participants: ({ id }: {id: string}, args: {}, context: Context) => context.prisma.channel.findUnique({ where:  {id} }).participants(), 
    messages: ({ id }: {id: string}, args: {}, context: Context) => context.prisma.channel.findUnique({ where:  {id} }).messages(),
  },
};
