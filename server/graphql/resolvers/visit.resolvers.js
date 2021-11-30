const { Visit, Patient, User, Consultation, Ward, Vitals, Clerkship } = require("../../models");
const { Op } = require("sequelize");

const include = [
  {
    model: User,
    as: "user",
  },
  {
    model: User,
    as: "doctor",
  },
  {
    model: Consultation,
    as: "consultation",
  },
  {
    model: Ward,
    as: "ward",
  },
  {
    model: Vitals,
    as: "vitals",
    include: [
      {
        model: User,
        as: "user",
        required: true,
      },
    ],
  },
  {
    model: Clerkship,
    as: "clerkship",
    include: [
      {
        model: User,
        as: "doctor",
        required: true,
      },
    ],
  },
  {
    model: Patient,
    as: "patient",
  },
];

const resolvers = {
  Query: {
    visits: async (
      _,
      { name, doctor, reason, page, pageSize, order: ordering },
      { authenticate }
    ) => {
      await authenticate();

      const query = { where: {} };
      const order = ordering === "ASC" ? [["createdAt", "ASC"]] : [["createdAt", "DESC"]];
      const options = {};

      page !== undefined && (options.page = page);
      pageSize !== undefined && (options.pageSize = pageSize);

      reason && (query.where.reason = reason);
      doctor && (query.where.doctorId = doctor);

      // Filter visit on patient name
      if (name) {
        include[6] = {
          model: Patient,
          as: "patient",
          where: {
            name: {
              [Op.iLike]: `${name}%`,
            },
          },
        };
      }

      return await Visit.paginate(query, options, include, order);
    },
    visit: async (_, { id }, { authenticate }) => {
      await authenticate();

      const visit = await Visit.findByPk(id, { include });

      if (!visit) throw new Error("Visit not found!");
      return visit;
    },
  },
  Mutation: {
    registerVisit: async (_, { data }, { user, authenticate }) => {
      await authenticate();
      const { patientId, doctorId, wardId, consultationId, reason, department, isDischarged } =
        data;
      const patient = await Patient.findByPk(patientId);
      if (!patient) throw new Error(`No patient with ID: ${patientId}`);

      const visit = await Visit.create({
        patientId,
        wardId,
        consultationId,
        department,
        reason,
        doctorId,
        isDischarged: isDischarged ?? false,
        userId: user.id,
        seenDoctor: false,
      });

      return await Visit.findByPk(visit.id, { include });
    },
    deleteVisit: async (_, { id }, { authenticate }) => {
      await authenticate({ admin: true });

      const visit = await Visit.findByPk(id);
      if (!visit) throw new Error(`No Visit with ID: ${id}`);

      await visit.destroy();
      return "Visit deleted successfully";
    },
  },
};

module.exports = resolvers;
