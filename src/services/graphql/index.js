'use strict';

const hooks = require('./hooks');
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import Resolvers from './resolvers';
import Schema from './schema';

module.exports = function () {
  const app = this;

  const executableSchema = makeExecutableSchema({
    typeDefs: Schema,
    resolvers: Resolvers.call(app)
  });

  app.use('/graphql', graphqlExpress((req) => {
    const { token, provider } = req.feathers;
    return {
      schema: executableSchema,
      context: {
        token,
        provider
      }
    }
  }))

  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
  }));

}
