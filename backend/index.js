const { ApolloServer, gql } = require("apollo-server");
const sequelize = require("./models/index");
const Account = require("./models/Account");

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
    deleteAccount(id: ID!): Boolean
  }
`;

const resolvers = {
  Query: {
    getAccounts: async () => await Account.findAll(),
  },
  Mutation: {
    createAccount: async (_, { name, email }) => {
      return await Account.create({ name, email, password: "password123" });
    },
    deleteAccount: async (_, { id }) => {
      try {
        const deleted = await Account.destroy({
          where: { id: Number(id) },
        });
        return deleted > 0;
      } catch (error) {
        return false;
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: true,
});

sequelize.sync().then(() => {
  server.listen().then(({ url }) => {
    console.log(`🚀 Banco conectado e servidor rodando em ${url}`);
  });
});
