const models = require("../models");

const PaymentValidator = {
  CONSULTATION: async itemId => {
    const item = await models.Item.findByPk(itemId);
    if (!item) throw new Error("No consultation matches the provided itemId!");
    return { itemName: item.name, amountPaid: item.fee };
  },

  LABORATORY: async itemId => {
    const item = await models.Request.findByPk(itemId, {
      include: [{ model: models.Item, as: "test", required: true }],
    });

    if (!item) throw new Error("No investigation matches the provided itemId!");
    return { itemName: item.test.name, amountPaid: item.test.cost };
  },

  PRESCRIPTIONS: async itemId => {
    const item = await models.Prescription.findByPk(itemId, {
      include: [{ model: models.Item, as: "drug", required: true }],
    });

    if (!item) throw new Error("No drug matches the provided itemId!");
    return { itemName: item.drug.name, amountPaid: item.drug.cost };
  },

  PROCEDURES: async itemId => {
    const item = await models.Prescription.findByPk(itemId, {
      include: [{ model: models.Item, as: "drug", required: true }],
    });

    if (!item) throw new Error("No procedure matches the provided itemId!");
    return { itemName: item.procedure.name, amountPaid: item.procedure.cost };
  },

  CONSUMABLES: async itemId => {
    const item = await models.Consumable.findByPk(itemId, {
      include: [{ model: models.Item, as: "consumable", required: true }],
    });

    if (!item) throw new Error("No consumable matches the provided itemId!");
    return { itemName: item.consumable.name, amountPaid: item.consumable.cost };
  },

  MISCELLANEOUS: async itemId => {
    const item = await models.MiscellaneousBill.findByPk(itemId);

    if (!item) throw new Error("No item in miscellaneous bills matches the provided itemId!");
    return { itemName: item.type, amountPaid: item.cost };
  },
};

async function validatePayment(payment) {
  const { type, itemId } = payment;

  const validatorPromise = PaymentValidator[type];
  if (validatorPromise === undefined) throw new Error(`Unsupported item type: ${type}`);

  const { amountPaid, itemName } = await validatorPromise(itemId);
  payment.amountPaid = amountPaid;
  payment.itemName = itemName;
  return payment;
}

module.exports = { validatePayment };
