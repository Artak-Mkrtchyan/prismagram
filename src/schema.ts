import path from 'path';
import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas';

const allTypes = fileLoader(path.join(__dirname, '/api/**/*.graphql'));
const allResolvers = fileLoader(path.join(__dirname, '/api/**/*.ts'));

export const typeDefs = mergeTypes(allTypes);
export const resolvers = mergeResolvers(allResolvers);
