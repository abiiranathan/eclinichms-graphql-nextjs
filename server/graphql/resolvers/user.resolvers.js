const { User } = require("../../models");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    users: async (_, { role }, { authenticate }) => {
      await authenticate();
      const where = {};

      role && (where.role = role);
      return await User.findAll({ where });
    },
    user: async (_, { id }, { authenticate }) => {
      await authenticate();
      return await User.findByPk(id);
    },
    currentUser: async (_, args, { user }) => {
      return user;
    },
  },
  Mutation: {
    login: async (_, { username, password }) => {
      const user = await User.findOne({ where: { username } });

      if (!user) throw new AuthenticationError(`Invalid login credentials!`);

      const isValid = await user.verifyPassword(password);

      if (!isValid) throw new AuthenticationError("Invalid login credentials!");

      return {
        user,
        token: await user.getToken(),
      };
    },
    registerUser: async (_, { user: payload }, { authenticate }) => {
      // Registered Admins only allowed
      await authenticate({ admin: true });

      const { password, ...data } = payload;
      const user = await User.create(data);
      await user.setPassword(password);
      await user.save();
      return { user, token: user.getToken() };
    },
    updateUser: async (_, { id, user }, { authenticate }) => {
      await authenticate();

      const { name, username, email, mobile, age, role } = user;
      const updates = {};

      name && (updates.name = name);
      username && (updates.username = username);
      email && (updates.email = email);
      mobile && (updates.mobile = mobile);
      age && (updates.age = age);
      role && (updates.role = role);

      const newUser = await User.findByPk(id);

      if (!newUser) throw Error("User not found");

      const update = await newUser.update(updates);
      return update;
    },

    deleteUser: async (_, { id }, { authenticate }) => {
      await authenticate({ admin: true });

      const user = await User.findByPk(id);

      if (!user) throw new Error("User Not Found!");

      await user.destroy();
      return "User account deleted successfully";
    },
  },
};

module.exports = resolvers;
