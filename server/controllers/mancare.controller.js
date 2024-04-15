const { Mancare, Categorie, Ingredient, Reteta } = require("../models/asocieri");

exports.getAllFoods = async (req, res) => {
  try {
    // Fetch all categories
    const categories = await Categorie.findAll();
    // Fetch all foods
    const foods = await Mancare.findAll();

    // Create a map of foods by 'id_categorie'
    const foodsMap = foods.reduce((map, food) => {
      const foodData = food.get({ plain: true });

      if (!map[foodData.id_categorie]) {
        map[foodData.id_categorie] = [];
      }

      // Convert blob to base64 if the 'imagine' column exists and is not null
      if (foodData.imagine) {
        foodData.imagine = Buffer.from(foodData.imagine).toString("base64");
      }

      map[foodData.id_categorie].push(foodData);
      return map;
    }, {});

    // Combine categories with their foods
    const combinedData = categories.map((category) => {
      return {
        id: category.id,
        denumire: category.denumire,
        mancaruri: foodsMap[category.id] || [],
      };
    });

    res.status(200).json(combinedData);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getFoodDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const foodDetails = await Mancare.findOne({
      where: { id },
      attributes: ["denumire", "imagine", "pret", "calorii", "gramaj", "vegetarian", "picant"],
      include: [
        {
          model: Reteta,
          attributes: ["necesar", "extra", "eliminabil"],
          include: [
            {
              model: Ingredient,
              attributes: ["id", "denumire", "pret"],
            },
          ],
        },
      ],
    });

    if (!foodDetails) {
      return res.status(404).json({ message: "Food not found" });
    }

    const response = {
      denumire: foodDetails.denumire,
      imagine: foodDetails.imagine.toString("base64"),
      gramaj: foodDetails.gramaj,
      calorii: foodDetails.calorii,
      pret: foodDetails.pret,
      vegetarian: foodDetails.vegetarian,
      picant: foodDetails.picant,
      ingrediente: foodDetails.Reteta.filter((r) => r.necesar || r.eliminabil).map((r) => ({
        id: r.Ingredient.id,
        denumire: r.Ingredient.denumire,
      })),
      eliminabile: foodDetails.Reteta.filter((r) => r.eliminabil).map((r) => ({
        id: r.Ingredient.id,
        denumire: r.Ingredient.denumire,
      })),
      extra: foodDetails.Reteta.filter((r) => r.extra).map((r) => ({
        id: r.Ingredient.id,
        denumire: r.Ingredient.denumire,
        pret: r.Ingredient.pret,
      })),
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching food details:", error);
    res.status(500).json({ message: "Error fetching food details" });
  }
};
