const User = require("../schemas/user");

const createUser = ({ email, password, name }) => {
  return User.create({ email, password, name, token });
};
const findUserByEmail = ({ email }) => {
  return User.findOne({ email });
};

const updateToken = ({ email, token }) => {
  return User.findOneAndUpdate({ email }, { $set: { token } });
};

module.exports = {
  updateToken,
  createUser,
  findUserByEmail,
};
