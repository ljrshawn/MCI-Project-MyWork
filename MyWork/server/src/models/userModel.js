const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
  },
  studentId: {
    type: String,
  },
  photo: {
    type: String,
    default: "default-profile-picture.png",
  },
  role: {
    type: String,
    enum: ["teacher", "student"],
    default: "teacher",
  },
  password: {
    type: String,
    require: true,
    minlength: 8,
    select: false,
  },
  passwordChanged: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  team: {
    type: String,
    default: "NO TEAM",
  },
  tag: {
    type: String,
  },
  hours: {
    type: Number,
    default: 0,
  },
  records: [
    {
      detail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Record",
      },
      year: {
        type: Number,
      },
      month: {
        type: Number,
      },
      date: {
        type: Number,
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (!this.studentId) this.studentId = this.email.split("@")[0];
  if (!this.id) this.id = this._id;
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChanged = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({
    active: { $ne: false },
  });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChanged) {
    const changedPasswordStamp = parseInt(
      this.passwordChanged.getTime() / 1000,
      10
    );

    return changedPasswordStamp > JWTTimeStamp;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.methods.createPasswordActiveToken = function () {
  const activeToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(activeToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 7 * 24 * 60 * 60 * 1000;

  return activeToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
