const express = require("express")
var router = express.Router();

const {companyController} = require("../controller");
const {list ,getById,createId,delById,updateById}= companyController;

const companyRoutes = () => {
  router.get("/", list);

  router.get("/:id",getById);

  router.post("/",createId);

  router.delete("/:id",delById)

  router.put("/:id",updateById)

  return router;
};
module.exports = companyRoutes;
