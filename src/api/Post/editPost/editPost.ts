import { isAuthenticated } from "../../../middlewares";
import { Context } from '../../../context';


enum Action {
   EDIT = "EDIT",
   DELETE = "DELETE"
  
}

export default {
  Mutation: {
    editPost: async (_: Record<string, unknown>, args: {id: string, caption: string, location: string, action: Action}, context: Context) => {
      // isAuthenticated(context.req);
      const { id, caption, location, action } = args;
      console.log(id, caption, location, action)
      // const { user } = context.req;
      const post = await context.prisma.post.findUnique({where: { id}});
      console.log(post)
      try {
      if (post) {
        if (action === Action.EDIT) {
          return context.prisma.post.update({
            data: { caption, location },
            where: { id },
          });
        } else if (action === Action.DELETE) {
          return context.prisma.post.delete({ where: { id }});
        }
      } else {
        throw Error("You can't do that");
      }
    
    } catch (e) {
      console.log('Error', e)
    }
    return post
    },
  },
};
