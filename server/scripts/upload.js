require("dotenv").config();
require("../db");

const uuid = require("uuid");
const path = require("path");
const fs = require("fs");
const csv = require("csv-parser");
const { Item } = require("../models");

const dataDir = path.resolve(__dirname, "../data");

async function doUpload(filename, type) {
  try {
    const results = [];

    fs.createReadStream(filename)
      .pipe(
        csv({
          strict: true,
        })
      )
      .on("data", data => {
        results.push({ id: `'${uuid.v4()}'`, ...data, type });
      })
      .on("end", async () => {
        try {
          const items = await Item.bulkCreate(results, { validate: true });
          console.log(`Inserted ${items.length} ${type.toLowerCase()}s`);
        } catch (e) {
          console.log(e);
          process.exit(1);
        }
      });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

fs.readdirSync(dataDir).forEach(async file => {
  const filename = path.resolve(dataDir, file);
  const basename = path.basename(file).split(".")[0];
  const type = basename.slice(0, -1).toUpperCase();
  await doUpload(filename, type);
});
