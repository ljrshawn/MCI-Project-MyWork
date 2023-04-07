const catchAsync = require("../utils/catchAsync");
const Team = require("../models/teamModel");

exports.getAllTeams = catchAsync(async (req, res, next) => {
  const teams = await Team.find();
  res.status(200).json(teams);
});

exports.addTeams = catchAsync(async (req, res, next) => {
  const team = await Team.findOne({ number: req.user.team });

  if (req.user.team === req.oldTeam) {
    return res.status(200).json(team);
  }

  if (req.oldTeam !== "NO TEAM" || req.user.team === "NO TEAM") {
    const oldTeam = await Team.findOne({ number: req.oldTeam });

    if (oldTeam) {
      const { member } = oldTeam;

      const newMember = [];
      member.map((el) =>
        el._id.toHexString() === req.user.id ? newMember : newMember.push(el)
      );
      await oldTeam.updateOne({ member: newMember });
    }
  }

  if (req.user.team === "NO TEAM") {
    return res.status(200).json(team);
  }

  const newMember = [req.user];
  if (!team) {
    const newTeam = await Team.create({
      number: req.user.team,
      member: newMember,
    });

    return res.status(200).json(newTeam);
  }
  team.member.map((el) => newMember.push(el));

  await team.updateOne({ member: newMember });
  res.status(200).json(team);
});
