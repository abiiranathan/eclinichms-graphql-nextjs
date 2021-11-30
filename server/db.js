const Sequelize = require("sequelize");
const uuid = require("uuid");
const DATABASE_URL = process.env.DATABASE_URL;
const debug = !!parseInt(process.env.debug);
const logging = debug ? console.log : false;

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  logging,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
    decimalNumbers: true,
  },
});

// Add Hook for creating a UUID for every modal
sequelize.addHook("beforeCreate", model => {
  model.id = uuid.v4();
});

sequelize.addHook("beforeBulkCreate", models => {
  models.forEach(model => {
    model.id = `'${uuid.v4()}'`;
  });
});

module.exports = sequelize;
