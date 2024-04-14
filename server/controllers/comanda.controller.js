const {
  Ingredient,
  Mancare,
  Comanda,
  Mancare_la_Comanda,
  Comanda_la_Eliminabil,
  Comanda_la_Extra,
} = require("../models/asocieri");
const sequelize = require("../config/database");

exports.sendOrder = async (req, res) => {
  const { items, tableId } = req.body;
  const transaction = await sequelize.transaction();

  try {
    const total = items.reduce((acc, item) => acc + parseFloat(item.pret) * item.cantitate, 0);

    let order = await Comanda.findOne({ where: { id_masa: tableId } }, { transaction });

    if (order) {
      order.pret_total = parseFloat(order.pret_total) + total;
      await order.save({ transaction });
    } else {
      order = await Comanda.create({ id_masa: tableId, pret_total: total }, { transaction });
    }

    for (let item of items) {
      const mancareLaComanda = await Mancare_la_Comanda.create(
        {
          id_mancare: item.id,
          id_comanda: order.id,
          cantitate: item.cantitate,
        },
        { transaction }
      );

      if (item.scoase) {
        for (let scoasa of item.scoase) {
          await Comanda_la_Eliminabil.create(
            {
              id_mancare_la_comanda: mancareLaComanda.id,
              id_eliminabil: scoasa.id,
            },
            { transaction }
          );
        }
      }

      if (item.extra) {
        for (let extra of item.extra) {
          await Comanda_la_Extra.create(
            {
              id_mancare_la_comanda: mancareLaComanda.id,
              id_extra: extra.id,
            },
            { transaction }
          );
        }
      }
    }

    await transaction.commit();
    res.status(200).json({ message: "Order processed successfully", order });
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    res.status(500).json({ message: "Error processing order", error: error.message });
  }
};

exports.getOrder = async (req, res) => {
  const { tableId } = req.body;

  try {
    const order = await Comanda.findOne({ where: { id_masa: tableId } });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const items = await Mancare_la_Comanda.findAll({
      where: { id_comanda: order.id },
      include: {
        model: Mancare,
        attributes: ["denumire", "imagine"],
      },
    });

    const detailedItems = await Promise.all(
      items.map(async (item) => {
        const scoaseRecords = await Comanda_la_Eliminabil.findAll({
          where: { id_mancare_la_comanda: item.id },
          include: {
            model: Ingredient,
            attributes: ["id", "denumire"],
          },
        });

        const extraRecords = await Comanda_la_Extra.findAll({
          where: { id_mancare_la_comanda: item.id },
          include: {
            model: Ingredient,
            attributes: ["id", "denumire"],
          },
        });

        return {
          id: item.id,
          id_mancare: item.id_mancare,
          id_comanda: item.id_comanda,
          cantitate: item.cantitate,
          denumire: item.Mancare.denumire,
          imagine: item.Mancare.imagine,
          scoase: scoaseRecords.map((el) => ({
            id: el.Ingredient.id,
            denumire: el.Ingredient.denumire,
          })),
          extra: extraRecords.map((ex) => ({
            id: ex.Ingredient.id,
            denumire: ex.Ingredient.denumire,
          })),
        };
      })
    );

    res.status(200).json({ order: order, items: detailedItems });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving order", error: error.message });
  }
};
