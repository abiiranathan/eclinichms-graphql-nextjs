const { Model, DataTypes } = require("sequelize");

module.exports = sequelize => {
  class Request extends Model {
    static associate(models) {
      this.belongsTo(models.Item, { as: "test", foreignKey: "itemId", type: DataTypes.UUID });
      this.belongsTo(models.Visit, { as: "visit", foreignKey: "visitId", type: DataTypes.UUID });
    }
  }

  Request.init(
    {
      visitId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "visits",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      requestedBy: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      reportedBy: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "",
      },
      report: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "",
      },
    },
    { timestamps: true, sequelize, tableName: "requests" }
  );

  return Request;
};
