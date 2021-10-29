import './env';
// import './passport';
import logger from 'morgan';

import http from 'http';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import { resolvers, typeDefs } from './schema';
import { uploadController, uploadMiddleware } from './upload';
import { authenticateJwt } from './passport';
import { createContext } from './context';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';

const PORT = process.env.PORT || 4000;

// app.use(logger("dev"));
// apollo.applyMiddleware({app});
// apollo.applyMiddleware(authenticateJwt);
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
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
}

startApolloServer(typeDefs, resolvers, createContext);
