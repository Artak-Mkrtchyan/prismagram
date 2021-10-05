import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

export default {
  Mutation: {
    upload: async (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const { caption, files, location } = args;
      const post = await prisma.createPost({
        user: { connect: { id: user.id } },
        caption,
        location
      });
      files.forEach(
        async (file) =>
          await prisma.createFile({
            url: file,
            post: {
              connect: {
                id: post.id,
              },
            },
          })
      );

      return post;
    },
  },
};
