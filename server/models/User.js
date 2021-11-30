const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Model, DataTypes } = require("sequelize");

class User extends Model {
  toJSON() {
    return { ...this.get(), passwordHash: undefined };
  }

  async getToken() {
    const today = new Date();
    const exp = new Date(today);

    exp.setDate(today.getDate() + 1);

    const payload = {
      id: this.id,
      exp: parseInt(exp.getTime() / 1000),
    };

    return jwt.sign(payload, process.env.SECRET_KEY);
  }

  async verifyToken(token) {
    try {
      return jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      return null;
    }
  }

  async setPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    this.passwordHash = hash;
    return this;
  }

  async verifyPassword(password) {
    return bcrypt.compareSync(password, this.passwordHash);
  }

  static associate(models) {
    this.hasMany(models.Visit, {
      as: "visits",
      foreignKey: { allowNull: false, name: "userId", type: DataTypes.INTEGER },
    });

    this.hasMany(models.Visit, {
      as: "consultations",
      foreignKey: { allowNull: false, name: "doctorId", type: DataTypes.UUID },
    });

    this.hasMany(models.Vitals, {
      as: "vitals",
      foreignKey: { allowNull: false, name: "userId", type: DataTypes.UUID },
    });

    this.hasMany(models.Clerkship, {
      as: "clerkships",
      foreignKey: { allowNull: false, name: "doctorId", type: DataTypes.UUID },
    });
  }
}

module.exports = sequelize => {
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Name can not be empty" },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          min: 6,
          max: 25,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 12,
          max: 100,
        },
      },
      sex: {
        type: DataTypes.ENUM("MALE", "FEMALE"),
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM(
          "ADMIN",
          "DOCTOR",
          "NURSE",
          "MIDWIFE",
          "ACCOUNTS",
          "LAB",
          "RADIOLOGY",
          "PHARMACY",
          "STORE"
        ),
        allowNull: false,
        defaultValue: "DOCTOR",
      },
      mobile: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [10, 10],
            msg: "Expected 10 digits for a ugandan phone number",
          },
        },
      },
      passwordHash: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: "users",
      timestamps: true,
      sequelize,
    }
  );

  return User;
};
