const { Model, DataTypes } = require("sequelize");

class Clerkship extends Model {
  static async exists(visitId) {
    if (!visitId) throw new Error("visitId can not be empty");

    const history = await Clerkship.findOne({ where: { visitId } });
    return history !== null;
  }

  static associate(models) {
    this.belongsTo(models.Visit, {
      as: "clerkship",
      foreignKey: { allowNull: false, name: "visitId", type: DataTypes.UUID },
    });

    this.belongsTo(models.User, {
      as: "doctor",
      foreignKey: { allowNull: false, name: "doctorId", type: DataTypes.UUID },
    });
  }
}

module.exports = sequelize => {
  Clerkship.init(
    {
      pc: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      hpc: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      ros: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "",
      },
      past_history: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "",
      },
      jaundice: {
        type: DataTypes.ENUM(["NONE", "TINGE", "MODERATE", "DEEP"]),
        allowNull: false,
        defaultValue: "NONE",
      },
      pallor: {
        type: DataTypes.ENUM(["NONE", "MILD", "MODERATE", "SEVERE", "PAPER_WHITE"]),
        allowNull: false,
        defaultValue: "NONE",
      },
      cyanosis: {
        type: DataTypes.ENUM(["NONE", "PERIPHERAL", "CENTRAL", "ACROCYANOSIS"]),
        allowNull: false,
        defaultValue: "NONE",
      },
      clubbing: {
        type: DataTypes.ENUM(["NONE", "GRADE_1", "GRADE_2", "GRADE_3", "GRADE_4", "HPOAP"]),
        allowNull: false,
        defaultValue: "NONE",
      },
      oedema: {
        type: DataTypes.ENUM(["NONE", "GRADE_1", "GRADE_2", "GRADE_3", "ANARSACA"]),
        allowNull: false,
        defaultValue: "NONE",
      },
      lymphadenopathy: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "",
      },
      skin: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "",
      },
      systemic_examination: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      diagnosis: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      differentials: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      plan: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },
    },
    {
      tableName: "clerkship",
      timestamps: true,
      sequelize,
    }
  );

  return Clerkship;
};
