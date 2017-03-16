'use strict';

const hooks = require('./hooks');
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { SubscriptionManager, PubSub } from 'graphql-subscriptions';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import Resolvers from './resolvers';
import Schema from './schema';

export  const pubsub = new PubSub();

module.exports = function () {

  const app = this;

  const executableSchema = makeExecutableSchema({
    typeDefs: Schema,
    resolvers: Resolvers.call(app)
  });

  app.use('/graphql', graphqlExpress((req) => {
    console.log('connection');
    const { provider } = req.feathers;

    return {
      schema: executableSchema,
      context: {
        provider
      }
    }
  }))

  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
  }));

  const WS_PORT = 5000;

  const subscriptionManager = new SubscriptionManager({
    schema: executableSchema,
    pubsub
  });

  // Create WebSocket listener server
  const websocketServer = createServer(app);

  // Bind it to port and start listening
  websocketServer.listen(WS_PORT, () => console.log(
    `Websocket Server is now running on http://localhost:${WS_PORT}`
  ));

  const subscriptionServer = new SubscriptionServer(
    {
      subscriptionManager,
    },
    {
      server: websocketServer,
      path: '/subscriptions'
    }
  );

}
