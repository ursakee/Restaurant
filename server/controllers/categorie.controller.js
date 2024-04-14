const { Categorie } = require("../models/asocieri");

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Categorie.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
