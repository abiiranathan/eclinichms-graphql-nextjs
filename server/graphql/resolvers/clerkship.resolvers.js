const { Clerkship } = require("../../models");

const resolvers = {
  Query: {
    clerkship: async (_, { visitId }, { authenticate }) => {
      await authenticate();
      return await Clerkship.findOne({ where: { visitId } });
    },
  },
  Mutation: {
    saveClerkship: async (_, { data }, { user, authenticate }) => {
      await authenticate();
      const clerked = await Clerkship.exists(data.visitId);
      if (clerked) throw new Error("Patient already clerked. Create a medical review instead!");

      return await Clerkship.create({ ...data, doctorId: user.id });
    },
    updateClerkship: async (_, { id, data }, { authenticate }) => {
      await authenticate();

      const c = await Clerkship.findByPk(id);
      if (!c) throw new Error("No matching ward");
      return await c.update(data);
    },
    deleteClerkship: async (_, { id }, { authenticate }) => {
      await authenticate({ admin: true });

      const c = await Clerkship.findByPk(id);

      if (!c) throw new Error("No matching ward");
      await c.destroy();
      return "Deleted successfully!";
    },
  },
};

module.exports = resolvers;
