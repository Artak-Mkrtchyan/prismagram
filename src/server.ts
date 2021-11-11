import './env';
// import './passport';

import http from 'http';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { logger } from 'src/logger';
import { resolvers, typeDefs } from 'src/schema';
import { uploadController, uploadMiddleware } from 'src/upload';
import { createContext } from 'src/context';

const PORT = process.env.PORT || 4000;

// app.use(logger("dev"));
// app.post("/api/upload", uploadMiddleware, uploadController);

async function startApolloServer(
  typeDefs: string,
  resolvers: any,
  context: any
) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context,
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );
  logger.info(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
}

startApolloServer(typeDefs, resolvers, createContext);
