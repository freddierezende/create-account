const { ApolloServer, gql } = require("apollo-server");

// Definir schema (o que o sistema poderá fazer)

const typeDefs = gql`
  type Account {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    #Listará todas as contas cadastradas
    getAccounts: [Account]
  }

  type Mutation {
    #criará uma nova conta
    createAccount(name: String!, email: String!): Account
  }
`;

// banco de dados fake --- apenas para teste

const accounts = [];

// Resolvers (lógica das funções)

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

// iniciando o servidor

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Servidor rodando em ${url}`);
});
