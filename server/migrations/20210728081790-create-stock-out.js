const { DataTypes } = require("sequelize");

module.exports = {
  up: async queryInterface => {
    await queryInterface.createTable("stockout", {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      inventoryId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "inventory",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      quantityTaken: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      takenBy: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      dateTaken: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      comment: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable("stockout");
  },
};
