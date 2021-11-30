const { DataTypes } = require("sequelize");

module.exports = {
  up: async queryInterface => {
    await queryInterface.createTable("users", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
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
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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

    // Create patients table
    await queryInterface.createTable("patients", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
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

    // Wards table
    await queryInterface.createTable("wards", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { msg: "Ward name can not be empty" },
        },
      },
    });

    // Consultations
    await queryInterface.createTable("consultations", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
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
    });

    // Create visits table after all foreign keys are created
    await queryInterface.createTable("visits", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      wardId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "wards",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
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
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      doctorId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      seenDoctor: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      consultationId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "consultations",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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
  down: async queryInterface => {
    await queryInterface.dropAllTables();
    await queryInterface.dropTable("SequelizeMeta");
  },
};
