const { Op } = require("sequelize");
const models = require("../../models");
const sequelize = require("../../db");
const { validatePayment } = require("../../utils/validators");

const resolvers = {
  Query: {
    patientBill: async (_, { visitId }, { authenticate }) => {
      await authenticate();

      // fetch visit with it's consultation
      const visit = await models.Visit.findByPk(visitId, {
        include: [{ model: models.Consultation, as: "consultation", required: true }],
      });

      // Fetch requests with tests
      const requests = await models.Request.findAll({
        where: { visitId },
        include: [{ model: models.Item, as: "test", required: true }],
      });

      // Fetch prescriptions with drugs
      const prescriptions = await models.Prescription.findAll({
        where: { visitId },
        include: [{ model: models.Item, as: "drug", required: true }],
      });

      // Fetch patient procedures
      const procedures = await models.Procedure.findAll({
        where: { visitId },
        include: [{ model: models.Item, as: "procedure", required: true }],
      });

      // fetch consumables
      const consumables = await models.Consumable.findAll({
        where: { visitId },
        include: [{ model: models.Item, as: "consumable", required: true }],
      });

      // Fetch miscellaneous bills
      const miscellaneous_bills = await models.MiscellaneousBill.findAll({
        where: { visitId },
      });

      return {
        consultation: {
          total: visit.consultation.fee,
          data: visit.consultation,
        },
        laboratory: {
          total: requests.reduce((prevValue, currvalue) => prevValue + currvalue.test.cost, 0),
          data: requests,
        },
        prescriptions: {
          total: prescriptions.reduce((prevValue, currvalue) => prevValue + currvalue.drug.cost, 0),
          data: prescriptions,
        },
        procedures: {
          total: procedures.reduce(
            (prevValue, currvalue) => prevValue + currvalue.procedure.cost,
            0
          ),
          data: procedures,
        },
        consumables: {
          total: consumables.reduce(
            (prevValue, currvalue) => prevValue + currvalue.consumable.cost,
            0
          ),
          data: consumables,
        },
        miscellaneous: {
          total: miscellaneous_bills.reduce(
            (prevValue, currvalue) => prevValue + currvalue.cost,
            0
          ),
          data: miscellaneous_bills,
        },
      };
    },
    payments: async (_, { visitId, billType, name, page, pageSize }, { authenticate }) => {
      await authenticate();
      const where = visitId ? { visitId } : {};
      const options = {};
      const query = { where };

      billType && (query.where.type = type);
      page !== undefined && (options.page = page);
      pageSize !== undefined && (options.pageSize = pageSize);

      if (name) {
        where.clientName = {
          [Op.iLike]: `%${name}%`,
        };
      }

      return await models.Payment.paginate(query, options);
    },
  },
  Mutation: {
    createMiscellaneousBill: async (_, { data }, { authenticate }) => {
      await authenticate();
      return await models.MiscellaneousBill.create(data);
    },
    savePayment: async (_, { data }, { user, authenticate }) => {
      await authenticate();

      const payments = await sequelize.transaction(async t => {
        const inserted = data.map(async row => {
          // Attach proper amount and item Name based on type
          const updatedRow = await validatePayment({ ...row, cashier: user.name });

          // save record to the database
          return await models.Payment.create(updatedRow, { transaction: t });
        });

        return await Promise.all(inserted);
      });

      return payments;
    },
    cancelPayment: async (_, { data }, { authenticate }) => {
      await authenticate({ admin: true });
      const payments = await models.Payment.findAll({
        where: {
          id: {
            [Op.in]: data,
          },
        },
      });

      if (payments.length === 0) throw new Error("No payment matches any of the provided IDs!");

      await Promise.all(payments.map(async payment => await payment.destroy()));
      return `Payment for ${payments.length} ${
        payments.length === 1 ? "item" : "items"
      } cancelled successfully!`;
    },
  },
};

module.exports = resolvers;
