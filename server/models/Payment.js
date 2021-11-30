const { Model, DataTypes } = require("sequelize");
const { billTypes } = require("../utils/billTypes");

module.exports = sequelize => {
  class Payment extends Model {
    static associate(models) {
      // Ignore associations with items and cashier as
      // we do not want CASCADE delete if deleted.
      this.belongsTo(models.Visit, { as: "payments", foreignKey: "visitId" });
      this.hasMany(models.Refund, { as: "refunds", foreignKey: "paymentId" });
    }
  }

  Payment.init(
    {
      visitId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "visits", key: "id" },
      },
      clientName: { type: DataTypes.STRING, allowNull: false },
      itemId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      itemName: { type: DataTypes.STRING, allowNull: false },
      amountPaid: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 0 } },
      type: {
        type: DataTypes.ENUM(billTypes),
        allowNull: false,
      },
      cashier: { type: DataTypes.STRING, allowNull: false },
    },
    { timestamps: true, sequelize, tableName: "payments" }
  );

  return Payment;
};
