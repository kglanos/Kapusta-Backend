const { createUser, findUserByEmail } = require("../services/user-service");
const bcrypt = require("bcryptjs");
// import { generateToken } from "../config/passport-jwt";
// import authService from "../config/passport-jwt";

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
    // const token = authService.getToken(isUserExist);
    // await authService.setToken(isUserExist.id, token);
    const result = await createUser({
      email,
      password: hashedPassword,
      name,
      // token,
    });

    return res.status(201).json({
      status: "success",
      code: 201,
      // token: isUserExist.token,
      user: {
        message: "Registration successful",
        email: result.email,
        name: result.name,
      },
    });
  } catch (e) {
    // const newUser = new User({
    //   name,
    //   email,
    //   password: hashedPassword,
    // });
    // const token = generateToken(newUser._id);
    // newUser.token = token;
    // await newUser.save();
    // res.status(201).json({
    //   message: "The user has been successfully registered.",
    //   token,
    //   user: {
    //     name,
    //     email,
    //   },
    // });
    console.error(e);
    next(e);
  }
};
module.exports = { addUser };
