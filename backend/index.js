const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Account {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    getAccounts: [Account]
  }

  type Mutation {
    createAccount(name: String!, email: String!): Account
  }
`;

const accounts = [];

const resolvers = {
  Query: {
    getAccounts: () => accounts,
  },
  Mutation: {
    createAccount: (_, { name, email }) => {
      const newAccount = { id: String(accounts.length + 1), name, email };
      accounts.push(newAccount);
      return newAccount;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Servidor rodando em ${url}`);
});
