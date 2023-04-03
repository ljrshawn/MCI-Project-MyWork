const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  date: {
    type: Date,
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
  evidence: [
    {
      type: String,
    },
  ],
});

recordSchema.pre("save", async function (next) {
  if (!this.id) this.id = this._id;
  next();
});

const Record = mongoose.model("Record", recordSchema);

module.exports = Record;
