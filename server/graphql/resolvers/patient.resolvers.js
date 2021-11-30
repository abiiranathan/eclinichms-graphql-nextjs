const {
  Patient,
  MedicalInfo,
  Visit,
  Vitals,
  Clerkship,
  User,
  Ward,
  Consultation,
} = require("../../models");
const { Op } = require("sequelize");

const include = [
  {
    model: Visit,
    as: "visits",
    include: [
      {
        model: Vitals,
        as: "vitals",
      },
      {
        model: Clerkship,
        as: "clerkship",
      },
      {
        model: User,
        as: "doctor",
      },
      {
        model: Ward,
        as: "ward",
      },
      {
        model: Consultation,
        as: "consultation",
      },
    ],
  },
  {
    model: MedicalInfo,
    as: "medicalInfo",
  },
];

const resolvers = {
  Query: {
    patients: async (_, { name, page, pageSize, order: ordering }, { authenticate }) => {
      await authenticate();

      const query = { where: {} };
      const order = ordering === "ASC" ? [["createdAt", "ASC"]] : [["createdAt", "DESC"]];
      const options = {};

      page !== undefined && (options.page = page);
      pageSize !== undefined && (options.pageSize = pageSize);

      if (name) {
        query.where.name = {
          [Op.iLike]: `%${name}%`,
        };
      }
      return await Patient.paginate(query, options, include, order);
    },
    patient: async (_, { id }, { authenticate }) => {
      await authenticate();
      const patient = await Patient.findByPk(id, { include });
      if (!patient) throw new Error(`No patient matches the provided ID: ${id}`);
      return patient;
    },
    patientByVisit: async (_, { visitId }, { authenticate }) => {
      await authenticate();
      const visit = await Visit.findByPk(visitId);
      const patient = await Patient.findByPk(visit.patientId, { include });
      if (!patient) throw new Error(`No patient matches the provided ID: ${id}`);
      return patient;
    },
  },
  Mutation: {
    registerPatient: async (_, { data }, { authenticate }) => {
      await authenticate();

      const patient = await new Patient({ ...data, visits: [] }).save();
      return patient;
    },
    updatePatient: async (_, { id, data }, { authenticate }) => {
      await authenticate();
      const patient = await Patient.findByPk(id);
      if (!patient) throw new Error("Patient Not Found!");

      const updated = await patient.update(data);
      return updated;
    },
    deletePatient: async (_, { id }, { user, authenticate }) => {
      await authenticate({ admin: true });
      const patient = await Patient.findByPk(id);
      if (!patient) throw new Error("Post with id: " + id + " not found");

      await patient.destroy();
      return "Patient account deleted successfully";
    },
  },
};

module.exports = resolvers;
