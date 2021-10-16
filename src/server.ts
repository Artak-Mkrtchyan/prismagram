import './env';
import './passport';

import { GraphQLServer } from 'graphql-yoga';
import logger from 'morgan';

import schema from './schema';
import { uploadController, uploadMiddleware } from './upload';
import { authenticateJwt } from './passport';


const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request })
});

server.express.use(logger("dev"));
server.express.use(authenticateJwt);
server.express.post("/api/upload", uploadMiddleware, uploadController);

server.start({ port: PORT }, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
