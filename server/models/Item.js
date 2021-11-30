const { Model, DataTypes } = require("sequelize");

module.exports = sequelize => {
  class Item extends Model {
    static associate(models) {
      this.hasMany(models.Request, {
        as: "test",
        foreignKey: "itemId",
        type: DataTypes.UUID,
      });

      this.hasMany(models.Prescription, {
        as: "drug",
        foreignKey: "drugId",
        type: DataTypes.UUID,
      });

      this.hasMany(models.Procedure, {
        as: "procedure",
        foreignKey: "procedureId",
        type: DataTypes.UUID,
      });

      this.hasMany(models.Consumable, {
        as: "consumable",
        foreignKey: "consumableId",
        type: DataTypes.UUID,
      });

      this.hasOne(models.Inventory, {
        as: "item",
        foreignKey: "itemId",
        type: DataTypes.UUID,
      });
    }

    static setupHooks(models) {
      // Automatically add item to inventory when it's created
      // Ignore procedures and tests

      this.addHook("afterCreate", async function (item) {
        if (item.type === "DRUG" || item.type === "CONSUMABLE") {
          models.Inventory.create({
            itemId: item.id,
            quantity: 0,
          })
            .then(() => {
              console.log("aferCreate: New inventory item initialized...");
            })
            .catch(err => console.log("afterCreate: ", err));
        }
      });
    }
  }

  Item.init(
    {
      type: {
        type: DataTypes.ENUM(["TEST", "DRUG", "PROCEDURE", "CONSUMABLE"]),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      cost: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false, sequelize, tableName: "items" }
  );

  return Item;
};
