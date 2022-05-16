const mongoose = require("mongoose");

const expCategoriesSchema = mongoose.Schema(
  {
    category: { type: String, trim: true, maxLength: 20 },
  },
  { timestamps: true }
);

const CategoriesExp = new mongoose.model(
  "ExpensesCategories",
  expCategoriesSchema
);

const testCategories = new CategoriesExp({
  category: "Maistas",
});

// testCategories.save();

module.exports = CategoriesExp;
