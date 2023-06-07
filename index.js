const express = require("express");
const expressApp = require("./expressApp.js");
const db= require("./db/models/index.js");
const Role = db.roles;

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

const StartServer = async () => {
const app = express();
require('./routes/authRoutes')(app);
require('./routes/userRoutes')(app);
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
function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
  Role.create({
    id: 2,
    name: "moderator"
  });
  Role.create({
    id: 3,
    name: "admin"
  });
}


StartServer();
