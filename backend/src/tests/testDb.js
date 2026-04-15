require("dotenv").config();

const config = require("../config/config.js")[process.env.NODE_ENV || "development"];

console.log("Environment:", process.env.NODE_ENV || "development");
console.log("Database Configuration:");
console.log(JSON.stringify(config, null, 2));

(async () => {
  const { Sequelize } = require("sequelize");

  const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      port: config.port || 5432,
      dialect: config.dialect || "postgres",
    }
  );

  try {
    await sequelize.authenticate();
    console.log("Connection successful!");
  } catch (err) {
    console.error("Connection failed:", err.message);
  } finally {
    await sequelize.close();
  }
})();
