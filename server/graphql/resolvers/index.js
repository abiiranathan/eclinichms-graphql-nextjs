const path = require("path");
const Date = require("graphql-date");
const { mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");

const resolversArray = loadFilesSync(path.join(__dirname, "./*.resolvers.js"));

module.exports = mergeResolvers(resolversArray, { Date });
