const Mancare = require("./mancare.model");
const Categorie = require("./categorie.model");
const Ingredient = require("./ingredient.model");
const Reteta = require("./reteta.model");
const Comanda = require("./comanda.model");
const Masa = require("./masa.model");
const Mancare_la_Comanda = require("./mancare_la_comanda.model");
const Comanda_la_Eliminabil = require("./comanda_la_eliminabil.model");
const Comanda_la_Extra = require("./comanda_la_extra.model");

// -------------------------------------------------------
// Mancare => Categorie
// -------------------------------------------------------

Mancare.belongsTo(Categorie, { foreignKey: "id_categorie" });
Categorie.hasMany(Mancare, { foreignKey: "id_categorie" });

// -------------------------------------------------------
// Comanda => Masa
// -------------------------------------------------------

Comanda.belongsTo(Masa, { foreignKey: "id_masa" });
Masa.hasMany(Comanda, { foreignKey: "id_masa" });

// -------------------------------------------------------
// Ingredient, Mancare => Reteta
// -------------------------------------------------------

Ingredient.hasMany(Reteta, { foreignKey: "id_ingredient" });
Mancare.hasMany(Reteta, { foreignKey: "id_mancare" });
Reteta.belongsTo(Mancare, { foreignKey: "id_mancare" });
Reteta.belongsTo(Ingredient, { foreignKey: "id_ingredient" });

// -------------------------------------------------------
// Mancare, Comanda => Mancare_la_Comanda
// -------------------------------------------------------

Mancare.hasMany(Mancare_la_Comanda, { foreignKey: "id_mancare" });
Comanda.hasMany(Mancare_la_Comanda, { foreignKey: "id_comanda" });
Mancare_la_Comanda.belongsTo(Mancare, { foreignKey: "id_mancare" });
Mancare_la_Comanda.belongsTo(Comanda, { foreignKey: "id_comanda" });

// -------------------------------------------------------
// Mancare_la_Comanda, Ingredient => Comanda_la_Extra
// -------------------------------------------------------

Mancare_la_Comanda.hasMany(Comanda_la_Extra, { foreignKey: "id_mancare_la_comanda" });
Ingredient.hasMany(Comanda_la_Extra, { foreignKey: "id_extra" });
Comanda_la_Extra.belongsTo(Mancare_la_Comanda, { foreignKey: "id_mancare_la_comanda" });
Comanda_la_Extra.belongsTo(Ingredient, { foreignKey: "id_extra" });

// -------------------------------------------------------
// Mancare_la_Comanda, Ingredient => Comanda_la_Eliminabil
// -------------------------------------------------------

Mancare_la_Comanda.hasMany(Comanda_la_Eliminabil, { foreignKey: "id_mancare_la_comanda" });
Ingredient.hasMany(Comanda_la_Eliminabil, { foreignKey: "id_eliminabil" });
Comanda_la_Eliminabil.belongsTo(Mancare_la_Comanda, { foreignKey: "id_mancare_la_comanda" });
Comanda_la_Eliminabil.belongsTo(Ingredient, { foreignKey: "id_eliminabil" });

// -------------------------------------------------------
// EXPORTS
// -------------------------------------------------------
module.exports = {
  Mancare,
  Categorie,
  Masa,
  Reteta,
  Ingredient,
  Comanda,
  Mancare_la_Comanda,
  Comanda_la_Eliminabil,
  Comanda_la_Extra,
};
