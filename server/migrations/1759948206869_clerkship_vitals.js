const { DataTypes } = require("sequelize");

module.exports = {
  up: async queryInterface => {
    await queryInterface.createTable("clerkship", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
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
        allowNull: true,
      },
      visitId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "visits",
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

    await queryInterface.createTable("vitals", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
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
      visitId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "visits",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
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
    await queryInterface.dropTable("clerkship");
    await queryInterface.dropTable("vitals");
  },
};
