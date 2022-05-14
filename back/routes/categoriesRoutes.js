const express = require("express");

const {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("./../controllers/categoriesController");

const router = express.Router();

router.route("/categories").get(getAllCategories).post(createCategory);

router
  .route("/categories/:id")
  .get(getCategoryById)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
