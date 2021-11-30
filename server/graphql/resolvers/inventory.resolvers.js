const { Inventory, Item } = require("../../models");
const { Op } = require("sequelize");

// Must Add required(true) for INNER JOIN
const include = {
  model: Item,
  as: "item",
  required: true,
  where: {},
};

const resolvers = {
  Query: {
    inventory: async (_, { type, name, page, pageSize, available, expired }, { authenticate }) => {
      await authenticate();

      const query = {
        where: {},
      };

      const options = {};

      if (available) {
        query.where.quantity = {
          [Op.gt]: 0,
        };
      }

      if (expired) {
        query.where.expiryDate = {
          [Op.lt]: new Date(),
        };
      }

      type && (query.where.type = type);
      page !== undefined && (options.page = page);
      pageSize !== undefined && (options.pageSize = pageSize);

      if (name) {
        include.where.name = {
          [Op.iLike]: `%${name}%`,
        };
      }

      return await Inventory.paginate(query, options, include);
    },
  },
  Mutation: {
    updateInventoryQuantity: async (_, { inventoryId, newQuantity }, { authenticate }) => {
      await authenticate();
      const inventory = await Inventory.findByPk(inventoryId, { include });
      await inventory.update({ quantity: newQuantity });
      return inventory;
    },
  },
};

module.exports = resolvers;
