const { Model, DataTypes } = require("sequelize");

module.exports = sequelize => {
  class StockIn extends Model {
    static associate(models) {
      this.belongsTo(models.Inventory, {
        as: "stockin",
        foreignKey: "inventoryId",
        type: DataTypes.UUID,
      });
    }

    static setupHooks(models) {
      this.addHook("afterCreate", async function (stock) {
        const inventory = await models.Inventory.findByPk(stock.inventoryId);
        await inventory.update({ quantity: stock.quantityBought + inventory.quantity });
        console.log("Inventory quantity increased by: ", stock.quantityBought);
      });
    }
  }

  StockIn.init(
    {
      inventoryId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "inventory",
          key: "id",
        },
      },
      quantityBought: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      unitCost: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      dateBought: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Date.now,
      },
      boughtBy: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      registeredBy: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      comment: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
    },
    {
      sequelize,
      tableName: "stockin",
      timestamps: true,
    }
  );
  return StockIn;
};
