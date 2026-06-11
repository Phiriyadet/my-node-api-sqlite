const { app, PORT } = require("./src/app");
const sequelize = require("./src/models");
// Connect SQlite
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("✅ SQLite connected & tables synced");
    // Run server
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
      console.log(
        `📖 Swagger docs available at http://localhost:${PORT}/api-docs`
      );
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to SQLite", err);
  });
