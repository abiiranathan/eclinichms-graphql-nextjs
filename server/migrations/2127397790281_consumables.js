const { DataTypes } = require("sequelize");

module.exports = {
  up: async queryInterface => {
    await queryInterface.createTable("consumables", {
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
      consumableId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "items",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      quantityUsed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      registeredBy: {
        type: DataTypes.STRING,
        allowNull: false,
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
  down: async queryInterface => {
    await queryInterface.dropTable("consumables");
  },
};
