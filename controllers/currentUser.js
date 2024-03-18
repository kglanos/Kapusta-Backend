const currentUser = async (req, res, next) => {
  try {
    const { name, email } = req.user;
    if (!name && !email) {
      return res.status(401).json({ message: "Not authorized" });
    }
    res.status(200).json({
      name,
      email,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { currentUser };
