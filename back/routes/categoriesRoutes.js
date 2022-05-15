const express = require("express");

const {
  getAllExpCategories,
  createExpCategory,
  getExpCategoryById,
  updateExpCategory,
  deleteExpCategory,
} = require("./../controllers/categoriesController");

const router = express.Router();

router.route("/expcategories").get(getAllExpCategories).post(createExpCategory);

router
  .route("/expcategories/:id")
  .get(getExpCategoryById)
  .put(updateExpCategory)
  .delete(deleteExpCategory);

module.exports = router;
