const { Sequelize } = require("sequelize");

// ถ้าตอน test จะมี process.env.IN_MEMORY_DB = true
const isTest = process.env.IN_MEMORY_DB === "true";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: isTest ? ":memory:" : "./database.sqlite",
  logging: false
});

module.exports = sequelize;
