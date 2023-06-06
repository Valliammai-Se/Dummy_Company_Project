const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const expressApp = async (app) => {
  app.use(cors());

  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));


  routes(app);
};
module.exports = expressApp;