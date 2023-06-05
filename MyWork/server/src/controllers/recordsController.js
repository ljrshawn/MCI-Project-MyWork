const catchAsync = require("../utils/catchAsync");
// const AppError = require("../utils/appError");
const Record = require("../models/recordModel");
const User = require("../models/userModel");
const Team = require("../models/teamModel");

exports.addNewRecords = catchAsync(async (req, res, next) => {
  // const record = await Record.findOne({ fullDate: req.body.fullDate });

  // if (record) {
  //   const message = `Duplicate field date, please using edit!`;
  //   return next(new AppError(message, 400));
  // }

  const temRecord = await Record.create({ ...req.body, hostId: req.user.id });

  // Save record to user
  const newRecord = {
    detail: temRecord,
    year: temRecord.year,
    month: temRecord.month,
    date: temRecord.date,
  };

  const user = await User.findById(req.user.id);
  const userRecords = user.records;

  userRecords.push(newRecord);

  const hours = user.hours + temRecord.hour;

  await user.updateOne({
    hours: hours,
    records: userRecords,
  });

  res.status(200).json(temRecord);
});

exports.getUserRecords = catchAsync(async (req, res, next) => {
  const { user } = req;

  const promises = user.records.map(async (el) => {
    // console.log(typeof JSON.stringify(el));

    if (el) {
      const record = await Record.findById(el.detail);

      return record;
    }
  });
  const records = await Promise.all(promises);

  res.status(200).json(records);
});

exports.getStuHomeRecords = catchAsync(async (req, res, next) => {
  const { user } = req;

  const filter = user.records.filter((el) => {
    const start = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const end = new Date();
    const elDate = new Date(el.year, el.month, el.date);
    return elDate >= start && elDate <= end;
  });

  const compare = function (a, b) {
    return (
      new Date(a.year, a.month, a.date) - new Date(b.year, b.month, b.date)
    );
  };

  filter.sort(compare);

  const promises = filter.map(async (el) => {
    if (el) {
      const record = await Record.findById(el.detail);
      return record;
    }
  });
  const records = await Promise.all(promises);

  const send = [];
  if (records.length > 0) {
    let dummy = records[0];
    for (let index = 1; index < records.length; index += 1) {
      const tem = records[index];
      if (dummy.fullDate === tem.fullDate) {
        dummy.hour += tem.hour;
      } else {
        send.push(dummy);
        dummy = tem;
      }
    }
    send.push(dummy);
  }

  res.status(200).json(send);
});

exports.getStuTeamHomeRecords = catchAsync(async (req, res, next) => {
  const team = await Team.findOne({ number: `${req.user.team}` });

  let hours = [req.user];
  if (team) {
    const promises = team.member.map(async (el) => {
      if (el) {
        const user = await User.findById(el);
        return user;
      }
    });
    hours = await Promise.all(promises);
  }

  res.status(200).json(hours);
});

exports.getStuMemRecords = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  const filter = user.records.filter((el) => {
    const start = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const end = new Date();
    const elDate = new Date(el.year, el.month, el.date);
    return elDate >= start && elDate <= end;
  });

  const compare = function (a, b) {
    return (
      new Date(a.year, a.month, a.date) - new Date(b.year, b.month, b.date)
    );
  };

  filter.sort(compare);

  const promises = filter.map(async (el) => {
    if (el) {
      const record = await Record.findById(el.detail);
      return record;
    }
  });
  const records = await Promise.all(promises);

  const send = [];
  if (records.length > 0) {
    let dummy = records[0];
    for (let index = 1; index < records.length; index += 1) {
      const tem = records[index];
      if (dummy.fullDate === tem.fullDate) {
        dummy.hour += tem.hour;
      } else {
        send.push(dummy);
        dummy = tem;
      }
    }
    send.push(dummy);
  }

  res.status(200).json(send);
});

exports.getRecordsEvidence = catchAsync(async (req, res, next) => {
  let record;
  if (req.params.id) {
    record = await Record.findById(req.params.id).select("+evidence.url");
  }

  res.status(200).json([record]);
});

exports.getTeamRecords = catchAsync(async (req, res, next) => {
  const team = await Team.findOne({ number: req.params.team });

  const membersPromises = team.member.map(async (id) => {
    const user = await User.findById(id);

    const filter = user.records.filter((el) => {
      const start = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const end = new Date();
      const elDate = new Date(el.year, el.month, el.date);
      return elDate >= start && elDate <= end;
    });

    const compare = function (a, b) {
      return (
        new Date(a.year, a.month, a.date) - new Date(b.year, b.month, b.date)
      );
    };

    filter.sort(compare);

    const promises = filter.map(async (el) => {
      if (el) {
        const record = await Record.findById(el.detail);
        return record;
      }
    });
    const records = await Promise.all(promises);

    const send = [];
    if (records.length > 0) {
      let dummy = records[0];
      for (let index = 1; index < records.length; index += 1) {
        const tem = records[index];
        if (dummy.fullDate === tem.fullDate) {
          dummy.hour += tem.hour;
        } else {
          send.push(dummy);
          dummy = tem;
        }
      }
      send.push(dummy);
    }
    return {
      name: user.firstName,
      userId: user.id,
      records: send,
    };
  });

  const members = await Promise.all(membersPromises);

  res.status(200).json(members);
});

exports.getDateDetail = catchAsync(async (req, res, next) => {
  const { query } = req;

  const user = await User.findById(query.userId);
  const filter = user.records.filter(
    (el) =>
      String(el.year) === query.year &&
      String(el.month) === query.month &&
      String(el.date) === query.date
  );
  const promises = filter.map(async (el) => {
    if (el) {
      const record = await Record.findById(el.detail);
      return record;
    }
  });
  const records = await Promise.all(promises);
  res.status(200).json(records);
});

exports.deleteRecords = catchAsync(async (req, res, next) => {
  const { hour } = await Record.findById(req.params.id);
  await Record.findByIdAndDelete(req.params.id);

  const user = await User.findById(req.user.id);
  let userRecords = user.records;

  userRecords = userRecords.filter(
    (record) => record.detail.toString() !== req.params.id
  );

  const hours = user.hours - hour;

  await user.updateOne({
    hours: hours,
    records: userRecords,
  });

  res.status(200).json({ status: "success" });
});
