const { Model, DataTypes } = require("sequelize");

module.exports = sequelize => {
  class Consumable extends Model {
    static associate(models) {
      this.belongsTo(models.Item, {
        as: "consumable",
        foreignKey: "consumableId",
        type: DataTypes.UUID,
      });

      this.belongsTo(models.Visit, {
        as: "visit",
        foreignKey: "visitId",
        type: DataTypes.UUID,
      });
    }
  }

  Consumable.init(
    {
      visitId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "visits",
          key: "id",
        },
      },
      consumableId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "items",
          key: "id",
        },
      },
      quantityUsed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      registeredBy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: true, sequelize, tableName: "consumables" }
  );

  return Consumable;
};
