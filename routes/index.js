const userRoutes = require("./userRoutes");
const companyRoutes = require("./companyRoutes");
const projectRoutes = require("./projectRoutes");
const projectassignRoutes = require("./projectassignRoutes");
const routes = (app) => {

  app.use("/persons", userRoutes());
  app.use("/companies", companyRoutes());
  app.use("/projects", projectRoutes());
  app.use("/projectAssignments", projectassignRoutes());
};
module.exports = routes;