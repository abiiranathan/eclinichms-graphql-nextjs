const { Model, DataTypes } = require("sequelize");

class Vitals extends Model {
  static associate(models) {
    this.belongsTo(models.Visit, {
      as: "vitals",
      foreignKey: { allowNull: false, name: "visitId", type: DataTypes.UUID },
    });

    this.belongsTo(models.User, {
      as: "user",
      foreignKey: { allowNull: false, name: "userId", type: DataTypes.UUID },
    });
  }
}

module.exports = sequelize => {
  Vitals.init(
    {
      sbp: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 0,
          max: 300,
        },
      },
      dbp: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 0,
          max: 250,
        },
      },
      pulse: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 350,
        },
      },
      temperature: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        validate: {
          min: 25.0,
          max: 45.0,
        },
      },
      resp: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          min: 0,
          max: 100,
        },
      },
      spo2: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 0,
          max: 100,
        },
      },
      weight: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        validate: {
          min: 0,
          max: 300,
        },
      },
      height: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        validate: {
          min: 0,
          max: 1000,
        },
      },
      gcs: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 15,
        validate: {
          min: 3,
          max: 15,
        },
      },
      muac: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        validate: {
          min: 0,
          max: 100,
        },
      },
    },
    {
      tableName: "vitals",
      timestamps: true,
      sequelize,
    }
  );

  return Vitals;
};
