const { DataTypes, Model } = require("sequelize");

class Patient extends Model {
  static associate(models) {
    this.hasMany(models.Visit, {
      as: "visits",
      foreignKey: {
        name: "patientId",
        allowNull: false,
        type: DataTypes.UUID,
      },
    });

    this.hasOne(models.MedicalInfo, {
      as: "medicalInfo",
      foreignKey: {
        name: "patientId",
        allowNull: false,
        type: DataTypes.UUID,
      },
    });
  }
}

module.exports = sequelize => {
  Patient.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      sex: {
        type: DataTypes.ENUM(["MALE", "FEMALE"]),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nextOfKin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      religion: {
        type: DataTypes.ENUM([
          "CATHOLIC",
          "PROTESTANT",
          "MOSLEM",
          "SDA",
          "PENTECOSTAL",
          "ORTHODOX",
          "OTHER",
        ]),
        allowNull: false,
      },
      maritalStatus: {
        type: DataTypes.ENUM([
          "SINGLE",
          "MARRIED",
          "DIVORCED",
          "COHABITING",
          "WIDOW",
          "WIDOWER",
          "NA",
        ]),
        allowNull: false,
      },
      tribe: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      occupation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      allergies: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      chronicIllness: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mobile: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          len: {
            args: [10, 10],
            msg: "Expected 10 digits for a ugandan phone number",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        trim: true,
      },
    },
    { sequelize, tableName: "patients", timestamps: true }
  );
  return Patient;
};
