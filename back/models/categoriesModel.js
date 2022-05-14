const mongoose = require("mongoose");

const categoriesSchema = mongoose.Schema(
  {
    category: { type: String, trim: true, maxLength: 20 },
  },
  { timestamps: true }
);

const Categories = new mongoose.model("Categories", categoriesSchema);

// const testCategories = new Categories({
//   category: "Kita",
// });

// testCategories.save();

module.exports = Categories;
