const { Model, DataTypes } = require("sequelize");

module.exports = sequelize => {
  class Procedure extends Model {
    static associate(models) {
      this.belongsTo(models.Item, {
        as: "procedure",
        foreignKey: "procedureId",
        type: DataTypes.UUID,
      });

      this.belongsTo(models.Visit, { as: "visit", foreignKey: "visitId", type: DataTypes.UUID });
    }
  }

  Procedure.init(
    {
      visitId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "visits",
          key: "id",
        },
      },
      procedureId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "items",
          key: "id",
        },
      },
      doctor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "",
      },
      dateCompleted: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      doneBy: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
    },
    { timestamps: true, sequelize, tableName: "procedures" }
  );

  return Procedure;
};
