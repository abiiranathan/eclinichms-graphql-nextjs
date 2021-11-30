const { Item, Patient, Visit, Request } = require("../../models");
const { Op } = require("sequelize");

const include = [
  {
    model: Item,
    as: "test",
    required: true,
  },
];

const resolvers = {
  Query: {
    requests: async (_, { visitId }, { authenticate }) => {
      await authenticate();
      const where = visitId ? { visitId } : {};
      return await Request.findAll({ where, include });
    },
    request: async (_, { id }, { authenticate }) => {
      await authenticate();
      return await Request.findByPk(id, { include });
    },
    labrequest: async (_, { id }, { authenticate }) => {
      await authenticate();

      const request = await Request.findByPk(id, {
        include: [...include, { model: Visit, as: "visit", required: true }],
      });

      if (!request) throw new Error("Request not found!");

      const patient = await Patient.findByPk(request.visit.patientId);
      request.patient = patient;

      return request;
    },
    labrequests: async (_, { visitId, page, pageSize, order: ordering }, { authenticate }) => {
      await authenticate();

      const query = { where: {} };
      const order = ordering === "ASC" ? [["createdAt", "ASC"]] : [["createdAt", "DESC"]];
      const options = {};

      const includeOptions = [
        ...include,
        {
          model: Visit,
          as: "visit",
          required: true,
          include: { model: Patient, as: "patient", required: true },
        },
      ];

      if (visitId) {
        query.where.visitId = visitId;
      }

      page !== undefined && (options.page = page);
      pageSize !== undefined && (options.pageSize = pageSize);

      return await Request.paginate(query, options, includeOptions, order);
    },
    items: async (_, { type, name, page, pageSize }, { authenticate }) => {
      await authenticate();

      const query = {
        where: {},
      };

      const options = {};

      type && (query.where.type = type);
      page !== undefined && (options.page = page);
      pageSize !== undefined && (options.pageSize = pageSize);

      if (name) {
        query.where.name = {
          [Op.iLike]: `%${name}%`,
        };
      }

      return await Item.paginate(query, options);
    },
  },
  Mutation: {
    saveRequest: async (_, { visitId, tests }, { user, authenticate }) => {
      await authenticate();

      if (tests.length === 0) {
        throw new Error("Provide one or more tests!");
      }

      const data = [];
      let errorOccured = false;

      for (const testId of tests) {
        const test = await Item.findByPk(testId);
        if (test && test.type === "TEST") {
          const request = await Request.create({
            itemId: testId,
            visitId,
            requestedBy: user.name,
            reportedBy: "",
            report: "",
          });

          const populatedRequest = await Request.findByPk(request.id, { include });
          data.push(populatedRequest);
        } else {
          errorOccured = true;
          break;
        }
      }

      if (errorOccured) {
        // Delete already created requests
        for (const r of data) {
          await r.destroy();
        }

        throw new Error("One or more ID(s) of tests is invalid!");
      }

      return data;
    },
    saveReport: async (_, { requestId, report }, { user, authenticate }) => {
      await authenticate();
      const request = await Request.findByPk(requestId, { include });
      if (!request) throw new Error("Request not found!");

      request.report = report;
      request.reportedBy = user.name;
      request.updatedAt = new Date();

      await request.save();
      return request;
    },
    deleteRequest: async (_, { id }, { authenticate }) => {
      await authenticate();

      const request = await Request.findByPk(id);
      if (!request) throw new Error("Request can not be deleted as it does not exist!");

      await request.destroy();
      return "Deleted successfully!";
    },
  },
};

module.exports = resolvers;
