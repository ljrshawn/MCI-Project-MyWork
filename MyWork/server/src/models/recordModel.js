const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  year: {
    type: String,
  },
  month: {
    type: String,
  },
  date: {
    type: String,
  },
  day: {
    type: String,
  },
  fullDate: {
    type: String,
  },
  start: {
    type: String,
    require: true,
  },
  end: {
    type: String,
    require: true,
  },
  hour: {
    type: Number,
    require: true,
  },
  task: {
    type: String,
    require: true,
  },
  hostId: {
    type: String,
    require: true,
  },
  evidence: [
    {
      name: {
        type: String,
      },
      url: {
        type: String,
        select: false,
      },
    },
  ],
});

recordSchema.pre("save", async function (next) {
  if (!this.id) this.id = this._id;
  next();
});

const Record = mongoose.model("Record", recordSchema);

module.exports = Record;
