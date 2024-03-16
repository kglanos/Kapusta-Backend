const { createUser, findUserByEmail } = require("../service/user-service");
const bcrypt = require("bcryptjs");

const addUser = async (req, res, next) => {
  const { name, password, email } = req.body;
  try {
    const isUserExist = await findUserByEmail({ email });

    if (isUserExist) {
      return res.status(409).json({
        status: "conflict",
        code: 409,
        data: `email ${email} is already used`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await createUser({
      email,
      password: hashedPassword,
      name,
    });

    return res.status(201).json({
      status: "success",
      code: 201,
      data: {
        message: "Registration successful",
        email: result.email,
        name: result.name,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = { addUser };
