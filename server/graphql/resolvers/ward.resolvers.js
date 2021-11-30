const { Ward } = require("../../models");

const resolvers = {
  Query: {
    wards: async (_, args, { authenticate }) => {
      await authenticate();
      return await Ward.findAll();
    },
    ward: async (_, { id }, { authenticate }) => {
      await authenticate();
      return await Ward.findByPk(id);
    },
  },
  Mutation: {
    saveWard: async (_, { name }, { authenticate }) => {
      await authenticate();
      return await Ward.create({ name });
    },
    updateWard: async (_, { id, name }, { authenticate }) => {
      await authenticate();

      const c = await Ward.findByPk(id);
      if (!c) throw new Error("No matching ward");
      return await c.update({ name });
    },
    deleteWard: async (_, { id }, { authenticate }) => {
      await authenticate({ admin: true });

      const c = await Ward.findByPk(id);

      if (!c) throw new Error("No matching ward");
      await c.destroy();
      return "Deleted successfully!";
    },
  },
};

module.exports = resolvers;
