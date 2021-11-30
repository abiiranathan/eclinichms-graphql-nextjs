const { Model, DataTypes } = require("sequelize");

class Ward extends Model {
  static associate(models) {
    /* 
    One-To-Many relationship 
    One ward belongs to many visits.
    */
    this.hasOne(models.Visit, {
      as: "ward",
      foreignKey: { allowNull: false, name: "wardId", type: DataTypes.UUID },
    });
  }
}

module.exports = sequelize => {
  Ward.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { msg: "Ward name can not be empty" },
        },
      },
    },
    {
      tableName: "wards",
      timestamps: false,
      sequelize,
    }
  );

  return Ward;
};
