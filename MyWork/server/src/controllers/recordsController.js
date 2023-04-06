const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");

exports.addNewRecords = catchAsync(async (req, res, next) => {
  console.log(req.body);
  console.log(req.user);

  res.status(200);
});
