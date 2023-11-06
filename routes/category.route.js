const express = require("express");
const { verifyAccessToken } = require("../helper/jwt_helper");
const {
  addCategory,
  removeCategory,
  updateCategory,
  addService,
  getAllServices,
  removeService,
  updateService,
  priceOptionsDelete,
} = require("../controllers/category.controller");

const router = express.Router();

router.use(verifyAccessToken);

router.route("/").post(addCategory);

router.route("/:id").delete(removeCategory).put(updateCategory);

router.route("/:id/service").post(addService).get(getAllServices);

router
  .route("/:categoryId/service/:serviceId")
  .delete(removeService)
  .put(updateService);

router
  .route("/:categoryId/service/:serviceId/price/:priceOptionsId")
  .delete(priceOptionsDelete);

module.exports = router;
