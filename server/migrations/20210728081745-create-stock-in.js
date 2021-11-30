const { DataTypes } = require("sequelize");

module.exports = {
  up: async queryInterface => {
    await queryInterface.createTable("stockin", {
      id: {
        allowNull: false,
        primaryKey: true,
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
      quantityBought: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      unitCost: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      dateBought: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Date.now,
      },
      boughtBy: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      registeredBy: {
        allowNull: false,
        type: DataTypes.STRING,
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
    await queryInterface.dropTable("stockin");
  },
};
