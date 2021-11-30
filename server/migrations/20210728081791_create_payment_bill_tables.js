const { DataTypes } = require("sequelize");
const { MISCELLANEOUS_TYPES, billTypes } = require("../utils/billTypes");

module.exports = {
  up: async queryInterface => {
    await queryInterface.createTable("miscellaneous_bills", {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      type: {
        type: DataTypes.ENUM(MISCELLANEOUS_TYPES),
        allowNull: false,
        unique: "item-visit-bill",
      },
      visitId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: "item-visit-bill",
        references: {
          model: "visits",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      clientName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cost: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
        },
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

    await queryInterface.createTable("payments", {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      visitId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "visits", key: "id" },
        unique: "visit-item-type-payment",
      },
      clientName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      itemId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: "visit-item-type-payment",
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
        unique: "visit-item-type-payment",
      },
      cashier: {
        type: DataTypes.STRING,
        allowNull: false,
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

    await queryInterface.createTable("refunds", {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });

    // An item in a single visit is only paid once
    await queryInterface.addConstraint("payments", {
      fields: ["visitId", "itemId", "type"],
      type: "unique",
      name: "payment_unique_constraint",
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable("miscellaneous_bills");
    await queryInterface.dropTable("payments");
    await queryInterface.dropTable("refunds");
  },
};
