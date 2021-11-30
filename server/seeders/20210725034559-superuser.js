const bcrypt = require("bcrypt");
const uuid = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: uuid.v4(),
          name: "Abiira Nathan",
          age: 32,
          sex: "MALE",
          username: "nabiizy",
          email: "email@example.com",
          passwordHash: await bcrypt.hash("password", 10),
          mobile: "0087945679",
          isAdmin: true,
          role: "DOCTOR",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "wards",
      [
        {
          id: uuid.v4(),
          name: "Outpatient ward",
        },
        {
          id: uuid.v4(),
          name: "Medical ward",
        },
        {
          id: uuid.v4(),
          name: "Surgical ward",
        },
        {
          id: uuid.v4(),
          name: "Paed ward",
        },
        {
          id: uuid.v4(),
          name: "Obs/Gyn ward",
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "consultations",
      [
        { id: uuid.v4(), name: "Free", fee: 0 },
        { id: uuid.v4(), name: "Clinical Officer", fee: 20000 },
        { id: uuid.v4(), name: "Medical Officer", fee: 30000 },
        { id: uuid.v4(), name: "Specialist", fee: 50000 },
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete("wards", null, {});
    await queryInterface.bulkDelete("consultations", null, {});
  },
};
