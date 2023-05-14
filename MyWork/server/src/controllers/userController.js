const cloudinary = require("cloudinary");
const User = require("../models/userModel");
// const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

const filterObj = (obj, ...allowedFileds) => {
  const newObj = {};

  Object.keys(obj).forEach((el) => {
    if (allowedFileds.includes(el)) {
      newObj[el] = obj[el];
    }
  });

  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(req.body, "name", "email");

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getProfile = catchAsync(async (req, res, next) => {
  res.status(200).json([req.user]);
});

exports.updateProfile = catchAsync(async (req, res, next) => {
  const { img } = req.body;

  await cloudinary.v2.config({
    cloud_name: "dp9citrja",
    api_key: "637946566878942",
    api_secret: "wg89KDP53zC37hz9DaWAtih6Ofc",
  });

  const options = {
    responsive_breakpoints: {
      create_derived: true,
      bytes_step: 20000,
      min_width: 200,
      max_width: 1000,
    },
    folder: "MyWork/User",
    public_id: `${req.user.studentId}`,
  };

  await cloudinary.v2.uploader.upload(img.url, options).then(async (result) => {
    await User.findByIdAndUpdate(req.user.id, { photo: result.url });
  });

  const user = await User.findById(req.user.id);

  res.status(200).json([user]);
});

exports.getUser = factory.getOne(User);
// exports.getAllUsers = factory.getAll(User);

// Do NOT update passwords with this!
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
