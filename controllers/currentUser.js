const currentUser = async (req, res, next) => {
  try {
    const currentUser = req.user;
    if (!currentUser) {
      return res.status(401).json({ message: "Not authorized" });
    }
    res.status(200).json({
      email: currentUser.email,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { currentUser };
