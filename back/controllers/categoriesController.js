const Categories = require("./../models/categoriesModel");

exports.getAllExpCategories = async (req, res) => {
  try {
    const categories = await Categories.find();

    res.status(200).json({
      status: "success",
      results: categories.length,
      data: {
        categories: categories,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createExpCategory = async (req, res) => {
  try {
    const newCategory = await Categories.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        category: newCategory,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getExpCategoryById = async (req, res) => {
  try {
    const category = await Categories.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        category: category,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateExpCategory = async (req, res) => {
  try {
    const category = await Categories.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        category: category,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteExpCategory = async (req, res) => {
  try {
    await Categories.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
