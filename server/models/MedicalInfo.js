const { Model, DataTypes } = require("sequelize");

module.exports = sequelize => {
  class MedicalInfo extends Model {
    static async exists(patientId) {
      if (!patientId) throw new Error("PatientId can not be empty");

      const info = await MedicalInfo.findOne({ where: { patientId } });
      return info !== null;
    }

    static associate(models) {
      this.belongsTo(models.Patient, {
        as: "medicalInfo",
        foreignKey: "patientId",
        type: DataTypes.UUID,
      });
    }
  }

  MedicalInfo.init(
    {
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
    },
    { sequelize, timestamps: true, tableName: "medical_info" }
  );

  return MedicalInfo;
};
