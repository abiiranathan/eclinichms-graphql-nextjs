const { Model, DataTypes } = require("sequelize");

module.exports = sequelize => {
  class Prescription extends Model {
    static associate(models) {
      this.belongsTo(models.Item, { as: "drug", foreignKey: "drugId", type: DataTypes.UUID });
      this.belongsTo(models.Visit, { as: "visit", foreignKey: "visitId", type: DataTypes.UUID });
    }
  }

  Prescription.init(
    {
      visitId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "visits",
          key: "id",
        },
      },
      route: {
        type: DataTypes.ENUM([
          "PO",
          "IV",
          "IM",
          "SUBLINGAL",
          "TOPICAL",
          "BUCCAL",
          "IT",
          "EPIDURAL",
          "EPICUTANEOUS",
          "ENEMA",
          "PR",
          "PV",
          "IO",
          "INTRAOCCULAR",
          "TRANSDERMAL",
          "INHALATIONAL",
          "INTRADERMAL",
          "SUBDERMAL",
          "SUBCUTANEOUS",
          "INTRAARTUCULAR",
          "INTRAPERITONEAL",
        ]),
        allowNull: false,
      },
      drugId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "items",
          key: "id",
        },
      },
      dose: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      frequency: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "How often is the dispensing?",
      },
      duration: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "The duration of the prescription",
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "The total qty of drug to be issued!",
        validate: {
          min: 1,
        },
      },
      issued: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "The qty of drug issued!",
        validate: {
          min: 0,
        },
      },
      instructions: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      total_doses: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      stopped: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      doctor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      issuedBy: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
    },
    { timestamps: true, sequelize, tableName: "prescriptions" }
  );

  return Prescription;
};
