const express = require("express")
var router = express.Router();

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
module.exports = userRoutes;
