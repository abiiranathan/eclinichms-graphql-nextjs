const { Model, DataTypes } = require("sequelize");
const { MISCELLANEOUS_TYPES } = require("../utils/billTypes");

module.exports = sequelize => {
  class MiscellaneousBill extends Model {
    static associate(models) {
      this.belongsTo(models.Visit, { as: "miscellaneous", foreignKey: "visitId" });
    }

    static setupHooks(models) {}
  }

  MiscellaneousBill.init(
    {
      type: {
        type: DataTypes.ENUM(MISCELLANEOUS_TYPES),
        allowNull: false,
        unique: "item-visit-bill",
      },
      visitId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: "item-visit-bill",
        references: { model: "visits", key: "id" },
      },
      clientName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cost: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
    },
    { timestamps: true, sequelize, tableName: "miscellaneous_bills" }
  );

  return MiscellaneousBill;
};
