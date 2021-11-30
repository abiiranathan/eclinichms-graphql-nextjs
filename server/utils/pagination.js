const defaultOrdering = [["id", "ASC"]];

async function paginate(query = {}, options = {}, include = [], order = defaultOrdering) {
  if (options.page < 1) {
    throw new Error("page should be greater than or equal to 1");
  }

  if (options.pageSize < 1) {
    throw new Error("pageSize should be greater than or equal to 1");
  }

  let page = 1;
  let pageSize = 10;

  options.page && page > 0 && (page = options.page);
  options.pageSize && (pageSize = options.pageSize);

  const offset = (page - 1) * pageSize;

  const queryOptions = {
    ...query,
    offset,
    limit: pageSize,
    order,
    include,
  };

  const { rows, count } = await this.findAndCountAll(queryOptions);

  const totalPages = Math.ceil(count / pageSize);
  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  return { rows, count, page, pageSize, totalPages, hasPrev, hasNext };
}

module.exports = { paginate, defaultOrdering };
