const generator = require("generate-password");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");
const Email = require("../utils/email");
const userController = require("./userController");
const APIFeatures = require("../utils/APIFeatures");

const importSend = async (user, statusCode, req, res, next) => {
  const createToken = user.createPasswordActiveToken();
  await user.save({ validateBeforeSave: false });

  try {
    const activeUrl = `${process.env.CLIENT_ADDRESS}/active/${createToken}`;

    // Send active email
    // await new Email(user, activeUrl).sendActive();

    res.status(statusCode).json({
      status: "success",
      data: {
        user,
        activeUrl,
      },
    });
  } catch (err) {
    return next(
      new AppError(
        "There was an error sending active email. But account has been create!",
        500
      )
    );
  }
};

const createSend = async (user, statusCode, req, res, next) => {
  const createToken = user.createPasswordActiveToken();
  await user.save({ validateBeforeSave: false });

  try {
    const activeUrl = `${process.env.CLIENT_ADDRESS}/active/${createToken}`;

    await new Email(user, activeUrl).sendActive();

    res.status(statusCode).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    userController.deleteUser(user);

    return next(
      new AppError("There was an error sending email. Try again later!", 500)
    );
  }
};

exports.createStudent = catchAsync(async (req, res, next) => {
  req.body.email = `${req.body.studentId}@adelaide.edu.au`;
  req.body.role = "student";
  req.body.password = generator.generate({
    length: 10,
    numbers: true,
  });

  const newUser = await User.create(req.body);

  createSend(newUser, 201, req, res, next);
});

exports.importStudent = catchAsync(async (req, res, next) => {
  req.body.email = `${req.body.studentId}@adelaide.edu.au`;
  req.body.role = "student";
  req.body.password = generator.generate({
    length: 10,
    numbers: true,
  });

  const newUser = await User.create(req.body);

  importSend(newUser, 201, req, res, next);
});

exports.getAllStudents = catchAsync(async (req, res, next) => {
  console.log(req.query);
  const filter = { role: "student" };
  // if (req.params.tourId) filter = { tour: req.params.tourId };

  // const start = Number(req.query._start);
  // const end = Number(req.query._end);
  // const limit = end - start;

  // const query = await User.find(filter).skip(start).limit(limit);

  const users = await User.find(filter);
  const feature = new APIFeatures(User.find(filter), req.query)
    .sort()
    .paginate();

  const query = await feature.query;

  const total = Object.entries(users).length;

  res.set("x-total-count", total);
  res.set("Access-Control-Expose-Headers", "x-total-count");

  res.status(200).json(query);
});

exports.deleteUser = (req, res, next) => {
  userController.deleteUser(req, res, next);
};

exports.getStudents = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new AppError("The user belonging to this token does no longer exist", 401)
    );
  }

  res.status(200).json(user);
});

const filterObj = (obj, ...allowedFileds) => {
  const newObj = {};

  Object.keys(obj).forEach((el) => {
    if (allowedFileds.includes(el)) {
      newObj[el] = obj[el];
    }
  });

  return newObj;
};

exports.updateStudents = catchAsync(async (req, res, next) => {
  const { team } = await User.findById(req.params.id);

  const filteredBody = filterObj(req.body, "team", "tag");
  await User.findByIdAndUpdate(req.params.id, filteredBody);

  req.user = await User.findById(req.params.id);
  req.oldTeam = team;
  next();
});
