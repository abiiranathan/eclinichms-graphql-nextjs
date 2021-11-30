const { Consultation } = require("../../models");

const resolvers = {
  Query: {
    consultations: async (_, args, { authenticate }) => {
      await authenticate();
      return await Consultation.findAll();
    },
    consultation: async (_, { id }, { authenticate }) => {
      await authenticate();
      return await Consultation.findByPk(id);
    },
  },
  Mutation: {
    saveConsultation: async (_, { name, fee }, { authenticate }) => {
      await authenticate();
      return await Consultation.create({ name, fee });
    },
    updateConsultation: async (_, { id, name, fee }, { authenticate }) => {
      await authenticate();
      const c = await Consultation.findByPk(id);

      if (!c) throw new Error("No matching consultation");

      return await c.update({ name, fee });
    },
    deleteConsultation: async (_, { id }, { authenticate }) => {
      await authenticate({ admin: true });
      const c = await Consultation.findByPk(id);

      if (!c) throw new Error("No matching consultation");

      await c.destroy();
      return "Deleted successfully!";
    },
  },
};

module.exports = resolvers;
