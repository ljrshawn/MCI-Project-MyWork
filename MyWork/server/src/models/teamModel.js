const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  number: {
    type: String,
    require: true,
  },
  member: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

teamSchema.pre("save", async function (next) {
  if (!this.id) this.id = this._id;
  next();
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
