const express = require("express");
const ApolloServer = require("apollo-server-express").ApolloServer;
const fs = require("fs");
const UserModel = require("./User/UserModel");
const db = require("./db");

const PORT = 4000;

const resolvers = {
  Query: {
    getAllEmployees: () => {
      return UserModel.getAllEmployees();
    },
  },
  Mutation: {
    createNewEmployee: (_, { emp }) => {
      return UserModel.createNewEmployee(emp);
    },
  },
};

const app = express();

app.use(express.static("public"));

async function serverStart() {
  const server = new ApolloServer({
    typeDefs: fs.readFileSync("./server/User/userSchema.graphql", "utf-8"),
    resolvers: resolvers,
  });

  await server.start();

  await db.dbConnect();

  server.applyMiddleware({ app, path: "/graphql" });

  app.listen(PORT, () => {
    console.log(`***** Server is listening on port ${PORT} *****`);
  });
}

serverStart();
