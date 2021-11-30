require("dotenv").config();

const express = require("express");
const { createServer } = require("http");
const { ApolloServer } = require("apollo-server-express");
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs");
const { appolloContext } = require("./auth");

const port = process.env.PORT || 4000;

async function startApolloServer() {
  const appollo = new ApolloServer({
    typeDefs,
    resolvers,
    subscriptions: {
      path: "/subscriptions",
    },
    context: appolloContext,
  });

  await appollo.start();
  const app = express();

  appollo.applyMiddleware({ app });

  const httpServer = createServer(app);
  appollo.installSubscriptionHandlers(httpServer);

  await new Promise(resolve => httpServer.listen({ port }, resolve));

  console.log(`🚀 Server ready at http://localhost:4000${appollo.graphqlPath}`);
  console.log(`Subscriptions ready at ws://localhost:4000${appollo.subscriptionsPath}`);
}

startApolloServer();
