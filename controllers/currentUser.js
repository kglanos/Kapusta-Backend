const currentUser = async (req, res, next) => {
  try {
    const { name, email, balance } = req.user;
    if (!name && !email) {
      return res.status(401).json({ message: "Not authorized" });
    }
    res.status(200).json({
      name,
      email,
      balance
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { currentUser };
