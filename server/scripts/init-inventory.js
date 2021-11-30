require("dotenv").config();
const sequelize = require("../db");

const { Op } = require("sequelize");
const { Item, Inventory } = require("../models");

async function init() {
  const items = await Item.findAll({
    where: {
      [Op.or]: [{ type: "DRUG" }, { type: "CONSUMABLE" }],
    },
  });

  console.log(`Found ${items.length} drugs and consumables...`);
  console.log("Setting initial inventory values to zero...\n");

  let count = 0;
  let errorOccurred = false;

  await sequelize.transaction(async t => {
    for (const item of items) {
      try {
        await Inventory.create(
          {
            itemId: item.id,
            quantity: 0,
          },
          { transaction: t }
        );

        count++;
        console.log("Progress: ", (count / items.length).toFixed(2) * 100, " %");
      } catch (error) {
        console.log(error);
        errorOccurred = true;
        break;
      }
    }
  });

  if (errorOccurred) {
    process.exit(1);
  } else {
    console.log("Operation complete!");
    process.exit(0);
  }
}

init();
