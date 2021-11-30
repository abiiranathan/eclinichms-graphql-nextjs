const { MedicalInfo } = require("../../models");

const resolvers = {
  Query: {
    medicalInfo: async (_, { patientId }, { authenticate }) => {
      await authenticate();
      return await MedicalInfo.findOne({ where: { patientId } });
    },
  },
  Mutation: {
    saveMedicalInfo: async (_, { data }, { authenticate }) => {
      await authenticate();
      const exists = await MedicalInfo.exists(data.patientId);
      if (!exists) {
        return await MedicalInfo.create(data);
      } else {
        throw new Error("Patient info already exists!");
      }
    },
    updateMedicalInfo: async (_, { id, data }, { authenticate }) => {
      await authenticate();

      const c = await MedicalInfo.findByPk(id);
      if (!c) throw new Error("Patient has not medical information to update!");
      return await c.update(data);
    },
    deleteMedicalInfo: async (_, { id }, { authenticate }) => {
      await authenticate();

      const c = await MedicalInfo.findByPk(id);
      if (!c) throw new Error("Patient has not medical information to delete!");
      await c.destroy();
      return "Deleted successfully!";
    },
  },
};

module.exports = resolvers;
