const { DataTypes } = require("sequelize");

module.exports = {
  up: async queryInterface => {
    await queryInterface.createTable("medical_info", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      hypertension: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      diabetes: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      hiv: {
        type: DataTypes.ENUM(["UNKNOWN", "NEGATIVE", "POSITIVE"]),
        defaultValue: "UNKNOWN",
      },
      cancer: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      heart_disease: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      liver_disease: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      smoking: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      alcohol: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      sickle_cell: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      allergies: {
        type: DataTypes.TEXT,
        defaultValue: "",
      },
      medication: {
        type: DataTypes.TEXT,
        defaultValue: "",
      },
      previous_surgery: {
        type: DataTypes.TEXT,
        defaultValue: "",
      },
      pregnancy: {
        type: DataTypes.ENUM([
          "NOT_APPLICABLE",
          "FIRST_TRIMESTER",
          "SECOND_TRIMESTER",
          "THIRD_TRIMESTER",
          "PEURPERIUM",
        ]),
        defaultValue: "NOT_APPLICABLE",
      },
      patientId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "patients",
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
    await queryInterface.dropTable("medical_info");
  },
};
