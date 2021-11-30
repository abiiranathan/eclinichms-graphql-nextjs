const { Vitals, User } = require("../../models");

const include = [
  {
    model: User,
    as: "user",
    required: true,
  },
];

const resolvers = {
  Query: {
    vitals: async (_, args, { authenticate }) => {
      await authenticate();
      return await Vitals.findAll({ include });
    },
    vital: async (_, { id }, { authenticate }) => {
      await authenticate();
      return await Vitals.findByPk(id, { include });
    },
  },
  Mutation: {
    saveVitals: async (_, { data }, { user, authenticate }) => {
      await authenticate();
      const v = await Vitals.create({ ...data, userId: user.id });
      return Vitals.findByPk(v.id, { include });
    },
    deleteVitals: async (_, { id }, { authenticate }) => {
      await authenticate({ admin: true });

      const c = await Vitals.findByPk(id);

      if (!c) throw new Error("No matching ward");
      await c.destroy();
      return "Deleted successfully!";
    },
  },
};

module.exports = resolvers;
