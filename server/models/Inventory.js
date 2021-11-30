const { Model, DataTypes } = require("sequelize");

module.exports = sequelize => {
  class Inventory extends Model {
    static associate(models) {
      this.belongsTo(models.Item, { as: "item", foreignKey: "itemId", type: DataTypes.UUID });

      this.hasOne(models.StockIn, {
        as: "stockin",
        foreignKey: "inventoryId",
        type: DataTypes.UUID,
      });

      this.hasOne(models.StockOut, {
        as: "stockout",
        foreignKey: "inventoryId",
        type: DataTypes.UUID,
      });
    }
  }

  Inventory.init(
    {
      itemId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        references: {
          models: "items",
          key: "id",
        },
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      expiryDate: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      tableName: "inventory",
    }
  );
  return Inventory;
};
