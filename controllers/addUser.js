const { createUser, findUserByEmail } = require("../services/user-service");
const bcrypt = require("bcryptjs");
// import { generateToken } from "../config/passport-jwt";
import authService from "../config/passport-jwt";

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
    // const token = generateToken();
    const token = authService.getToken(user);
    await authService.setToken(user.id, token);
    const result = await createUser({
      email,
      password: hashedPassword,
      name,
      token,
    });

    return res.status(201).json({
      status: "success",
      code: 201,
      token: user.token,
      user: {
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
