const User = require("../schemas/user");

const createUser = ({ email, password, name }) => {
  return User.create({ email, password, name });
};
const findUserByEmail = ({ email }) => {
  return User.findOne({ email });
};


const updateToken = ({ email, token }) => {
  return User.findOneAndUpdate({ email }, { $set: { token } });
};

const updateUserBalance = ({ _id, balance }) => {
  return User.findOneAndUpdate({ _id }, { $set: { balance } });
};


module.exports = {
  updateToken,
  createUser,
  findUserByEmail,
  updateUserBalance
};
