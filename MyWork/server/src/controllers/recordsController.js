const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Record = require("../models/recordModel");
const User = require("../models/userModel");

exports.addNewRecords = catchAsync(async (req, res, next) => {
  const record = await Record.findOne({ fullDate: req.body.fullDate });

  if (record) {
    const message = `Duplicate field date, please using edit!`;
    return next(new AppError(message, 400));
  }

  const newRecord = await Record.create(req.body);

  // Save record to user
  const user = await User.findById(req.user.id);
  const userRecords = user.records;

  userRecords.push(newRecord);

  const hours = user.hours + newRecord.hour;

  await user.updateOne({ hours: hours, records: userRecords });
  res.status(200).json(newRecord);
});

exports.getUserRecords = catchAsync(async (req, res, next) => {
  const { user } = req;

  const promises = user.records.map(async (el) => {
    // console.log(typeof JSON.stringify(el));

    if (el) {
      const record = await Record.findById(el);

      return record;
    }
  });
  const records = await Promise.all(promises);

  res.status(200).json(records);
});
