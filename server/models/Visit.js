const { DataTypes, Model } = require("sequelize");

class Visit extends Model {
  static associate(models) {
    this.belongsTo(models.Ward, { as: "ward", foreignKey: "wardId", type: DataTypes.UUID });
    this.belongsTo(models.Consultation, {
      as: "consultation",
      foreignKey: "consultationId",
      type: DataTypes.UUID,
    });
    this.belongsTo(models.Patient, {
      as: "patient",
      foreignKey: "patientId",
      type: DataTypes.UUID,
    });
    // user who registers the visit
    this.belongsTo(models.User, { as: "user", foreignKey: "userId", type: DataTypes.UUID });

    // Visit must be assigned to a doctor
    this.belongsTo(models.User, { as: "doctor", foreignKey: "doctorId", type: DataTypes.UUID });

    // Each visit can have multiple vitals
    this.hasMany(models.Vitals, {
      as: "vitals",
      foreignKey: {
        name: "visitId",
        allowNull: false,
        type: DataTypes.UUID,
      },
    });

    // Each visit is associated with a single clerkship
    this.hasOne(models.Clerkship, {
      as: "clerkship",
      foreignKey: {
        name: "visitId",
        allowNull: false,
        type: DataTypes.UUID,
      },
    });

    this.hasMany(models.Request, {
      as: "requests",
      foreignKey: {
        name: "visitId",
        allowNull: false,
        type: DataTypes.UUID,
      },
    });

    this.hasMany(models.Prescription, {
      as: "prescriptions",
      foreignKey: {
        name: "visitId",
        allowNull: false,
        type: DataTypes.UUID,
      },
    });

    this.hasMany(models.Procedure, {
      as: "procedures",
      foreignKey: {
        name: "visitId",
        allowNull: false,
        type: DataTypes.UUID,
      },
    });

    this.hasMany(models.Consumable, {
      as: "consumables",
      foreignKey: {
        name: "visitId",
        allowNull: false,
        type: DataTypes.UUID,
      },
    });

    // Cashier
    this.hasMany(models.MiscellaneousBill, {
      as: "miscellaneous",
      foreignKey: {
        name: "visitId",
        allowNull: false,
        type: DataTypes.UUID,
      },
    });

    this.hasMany(models.Payment, {
      as: "payments",
      foreignKey: {
        name: "visitId",
        allowNull: false,
        type: DataTypes.UUID,
      },
    });

    this.hasMany(models.Refund, {
      as: "refunds",
      foreignKey: {
        name: "visitId",
        allowNull: false,
        type: DataTypes.UUID,
      },
    });
  }
}

module.exports = sequelize => {
  Visit.init(
    {
      department: {
        type: DataTypes.ENUM([
          "OUTPATIENT",
          "MEDICINE",
          "SURGERY",
          "OBSTETRICS",
          "GYNAECOLOGY",
          "PAEDIATRICS",
        ]),
        allowNull: false,
      },
      reason: {
        type: DataTypes.ENUM(["CONSULTATION", "LABORATORY_ONLY", "PHARMACY_ONLY"]),
        allowNull: false,
      },
      isDischarged: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      seenDoctor: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    { sequelize, tableName: "visits", timestamps: true }
  );
  return Visit;
};
