const express = require("express")
var router = express.Router();

const {projectAssignController} = require("../controller");
const {list,getById,createId,delById,updateById}= projectAssignController;

const projectAssignRoutes = () => {
  router.get("/", list);

  router.get("/:id",getById);

  router.post("/",createId);

  router.delete("/:id",delById)

  router.put("/:id",updateById)

  return router;
};
module.exports = projectAssignRoutes;