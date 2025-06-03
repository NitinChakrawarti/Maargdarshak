import { ApolloServer } from 'apollo-server-express';
// import typeDefs from './schema.js';
// import resolvers from './resolvers.js';

const typeDefs = `
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
  },
};

async function setupGraphQL(app) {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
}

export { setupGraphQL };
