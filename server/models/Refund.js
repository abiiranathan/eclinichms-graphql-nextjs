const { Model, DataTypes } = require("sequelize");
const { billTypes } = require("../utils/billTypes");

module.exports = sequelize => {
  class Refund extends Model {
    static associate(models) {
      this.belongsTo(models.Visit, { as: "miscellaneous", foreignKey: "visitId" });
      this.belongsTo(models.Payment, { as: "refunds", foreignKey: "paymentId" });
    }
  }

  Refund.init(
    {
      paymentId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      visitId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      itemId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      clientName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      itemName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amountPaid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 0 },
      },
      type: {
        type: DataTypes.ENUM(billTypes),
        allowNull: false,
      },
      cashier: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cancelledBy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: true, sequelize, tableName: "refunds" }
  );

  return Refund;
};
