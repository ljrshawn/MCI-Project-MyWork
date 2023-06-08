const catchAsync = require("../utils/catchAsync");
const Team = require("../models/teamModel");
const User = require("../models/userModel");

exports.getAllTeams = catchAsync(async (req, res, next) => {
  const teams = await Team.find();
  res.status(200).json(teams);
});

const queue = [];

const createTeam = async () => {
  if (queue.length !== 0) {
    const user = queue.shift();

    if (user.oldTeam !== "NO TEAM") {
      const oldTeam = await Team.findOne({ number: user.oldTeam });

      if (oldTeam) {
        let { member } = oldTeam;

        member = member.filter((el) => el.toString() !== user.id);
        if (member.length === 0) {
          await Team.findByIdAndDelete(oldTeam.id);
        } else {
          await oldTeam.updateOne({ member });
        }
      }
    }
    if (user.team === "NO TEAM") {
      return;
    }
    const team = await Team.findOne({ number: user.team });
    const newMember = [user];
    if (!team) {
      await Team.create({
        number: user.team,
        member: newMember,
      });
      return;
      // return res.status(200).json(newTeam);
    }
    team.member.map((el) => newMember.push(el));

    await team.updateOne({ member: newMember });
    // res.status(200).json(team);
  }
};

exports.addTeams = catchAsync(async (req, res, next) => {
  // const team = await Team.findOne({ number: req.user.team });
  if (req.user.team === req.user.oldTeam) {
    return res.status(200).json({ status: "success" });
  }

  queue.push(req.user);
  setTimeout(createTeam, queue.length * 200);
  res.status(200).json({ status: "success" });
});

exports.getAllTeamsRecords = catchAsync(async (req, res, next) => {
  const teams = await Team.find();

  let users = [];
  if (teams) {
    const promises = teams.map(async (el) => {
      if (el.member && el.member.length > 0) {
        const promise = el.member.map(async (e) => {
          const user = await User.findById(e);
          return user;
        });
        return await Promise.all(promise);
      }
    });

    users = await Promise.all(promises);
  }

  res.status(200).json(users);
});
