class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["_start", "sort", "_end", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString._sort) {
      let sortBy = "";
      if (this.queryString._order === "desc") {
        sortBy = "-";
      }
      sortBy += this.queryString._sort;
      console.log(sortBy);
      this.query = this.query.sort(sortBy);
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  paginate() {
    const start = Number(this.queryString._start);
    const end = Number(this.queryString._end);
    const limit = end - start;

    this.query = this.query.skip(start).limit(limit);

    return this;
  }
}
module.exports = APIFeatures;
