const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  id: {
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
    type: String,
    require: true,
  },
  task: {
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
