const { Item, Patient, Visit, Consumable } = require("../../models");

const include = [
  {
    model: Item,
    as: "consumable",
  },
];

const resolvers = {
  Query: {
    consumables: async (_, { visitId }, { authenticate }) => {
      await authenticate();
      const where = visitId ? { visitId } : {};

      const consumables = await Consumable.findAll({
        where,
        include: [...include, { model: Visit, as: "visit" }],
      });

      const populate = async p => {
        const patient = await Patient.findByPk(p.visit.patientId);
        p.patient = patient;
        return p;
      };

      const data = [];
      for (const p of consumables) {
        data.push(await populate(p));
      }
      return data;
    },
    consumable: async (_, { id }, { authenticate }) => {
      await authenticate();

      const consumable = await Consumable.findByPk(id, {
        include: [...include, { model: Visit, as: "visit" }],
      });

      if (!consumable) throw new Error("Consumable not found!");
      const patient = await Patient.findByPk(consumable.visit.patientId);

      consumable.patient = patient;
      return consumable;
    },
  },
  Mutation: {
    saveConsumables: async (_, { visitId, consumables }, { user, authenticate }) => {
      await authenticate();

      const data = [];
      let errorOccured = false;

      /* Loop through array of consumable objects */
      for (const { consumableId, quantityUsed } of consumables) {
        const item = await Item.findOne({
          id: consumableId,
          type: "CONSUMABLE",
        });

        if (item) {
          const p = await Consumable.create({
            visitId,
            doctor: user.name,
            consumableId,
            quantityUsed,
            registeredBy: user.name,
          });

          const populated = await Consumable.findByPk(p.id, { include });
          data.push(populated);
        } else {
          errorOccured = true;
          break;
        }
      }

      if (errorOccured) {
        for (const r of data) {
          await r.destroy();
        }
        throw new Error("One or more ID(s) of consumables is invalid!");
      }

      return data;
    },
    deleteConsumable: async (_, { id }, { authenticate }) => {
      await authenticate();

      const consumable = await Consumable.findByPk(id);
      if (!consumable) throw new Error("Consumable can not be deleted as it does not exist!");

      await consumable.destroy();
      return "Deleted successfully!";
    },
  },
};

module.exports = resolvers;
