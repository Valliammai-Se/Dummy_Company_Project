const express = require("express")
var router = express.Router();
const { authJwt } = require("../middlewares");
const controller = require("../controller/userController");


const {userController} = require("../controller");
const {list,getById,getBycId,createId,delById,updateById}= userController;
const userRoutes = () => {
  router.get("/", list);

  router.get("/:id",getById);

  router.post("/",createId);

  router.delete("/:id",delById);

  router.put("/:id",updateById);

  router.get("/company/:id",getBycId)

  return router;
};
module.exports = userRoutes,function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
