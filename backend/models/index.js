const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("create_account_db", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = sequelize;
