const { Model, DataTypes } = require("sequelize");

module.exports = sequelize => {
  class Consultation extends Model {
    static associate(models) {
      this.hasOne(models.Visit, {
        as: "consultation",
        foreignKey: {
          type: DataTypes.UUID,
          allowNull: false,
          name: "consultationId",
        },
      });
    }
  }

  Consultation.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { msg: "Consultation name can not be empty" },
        },
      },
      fee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
    },
    {
      tableName: "consultations",
      timestamps: false,
      sequelize,
    }
  );

  return Consultation;
};
