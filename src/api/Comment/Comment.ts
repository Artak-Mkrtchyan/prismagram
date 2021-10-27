import { Context } from "../../context";


export default {
  Comment:{
    user: ({ id }: {id: string}, args: {}, context: Context) => {
      return context.prisma.comment.findUnique({where: {id}}).user();
    },
    post: ({ id }: {id: string}, args: {}, context: Context) => {
      return context.prisma.comment.findUnique({where: {id}}).post();
    },
  },
};
