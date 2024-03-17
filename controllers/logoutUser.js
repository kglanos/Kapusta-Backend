const { findUserByEmail } = require("../services/user-service");

const logoutUser = async (req, res, next) => {
  const { email } = req.user;

  try {
    const user = await findUserByEmail({ email });
    console.log(user);
    if (user) {
      user.token = null;
      await user.save();
      res
        .status(204)
        .json({ status: "No content", code: 204, message: "logout succesful" });
    } else {
      res
        .status(401)
        .json({ status: "Unauthorized", code: 401, message: "Not authorized" });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = { logoutUser };
