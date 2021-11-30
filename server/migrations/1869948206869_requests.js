const { DataTypes } = require("sequelize");

module.exports = {
  up: async queryInterface => {
    await queryInterface.createTable("requests", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
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
        allowNull: false,
        defaultValue: "",
      },
      itemId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "items",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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
    await queryInterface.dropTable("requests");
  },
};
