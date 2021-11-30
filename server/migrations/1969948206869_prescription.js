const { DataTypes } = require("sequelize");

module.exports = {
  up: async queryInterface => {
    await queryInterface.createTable("prescriptions", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      visitId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "visits",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Date.now,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Date.now,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("prescriptions");
  },
};
