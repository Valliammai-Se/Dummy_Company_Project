const express = require("express");
const expressApp = require("./expressApp.js");
const db= require("./db/models/index.js");


const StartServer = async () => {
  const app = express();

  try {
    await db.sequelize.authenticate();

    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  await expressApp(app);

  app.listen(3000, () => {
      console.log(`Listening to port 3000`);
    })

    .on("error", (err) => {
      console.log(err);

      process.exit();
    });
};

StartServer();
