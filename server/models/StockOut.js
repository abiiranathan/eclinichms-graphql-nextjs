const { Model, DataTypes } = require("sequelize");

module.exports = sequelize => {
  class StockOut extends Model {
    static associate(models) {
      this.belongsTo(models.Inventory, {
        as: "stockout",
        foreignKey: "inventoryId",
        type: DataTypes.UUID,
      });
    }

    static setupHooks(models) {
      this.addHook("afterCreate", async function (stock) {
        const inventory = await models.Inventory.findByPk(stock.inventoryId);

        const newQuantity = Math.max(0, inventory.quantity - stock.quantityTaken);
        await inventory.update({ quantity: newQuantity });

        console.log("Inventory quantity deducted by: ", stock.quantityTaken);
      });
    }

    static setupHooks(models) {
      this.addHook("beforeDestroy", async function (stock) {
        // Reverses stock out and increases inventory
        // Stockout can be cancelled within 3 hours
        const HOURS = 3;

        const inventory = await models.Inventory.findByPk(stock.inventoryId);
        const cancelledWithinMS = HOURS * 60 * 60 * 1000;
        const createdAt = new Date(stock.createdAt).getTime();

        if (createdAt + cancelledWithinMS > Date.now()) {
          throw new Error(`Reversal of stock deduction is only possible within ${HOURS} hours.`);
        }

        const newQuantity = inventory.quantity + stock.quantityTaken;
        await inventory.update({ quantity: newQuantity });

        console.log("Inventory quantity restored(+) by: ", stock.quantityTaken);
      });
    }
  }

  StockOut.init(
    {
      inventoryId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "inventory",
          key: "id",
        },
      },
      quantityTaken: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      takenBy: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      dateTaken: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      comment: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
    },
    {
      sequelize,
      tableName: "stockout",
      timestamps: true,
    }
  );
  return StockOut;
};
