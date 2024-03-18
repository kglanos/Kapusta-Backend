const passport = require("passport");
const passportJWT = require("passport-jwt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../schemas/user");

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JWTStrategy(opts, async (payload, done) => {
    try {
      const user = await User.findOne({ _id: payload.id });
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      console.error(error);
      return done(error, false);
    }
  })
);

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
        data: "Unauthorized",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// class AuthService {
//   getToken(user) {
//     const id = user.id;
//     const payload = { id };
//     const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });
//     return token;
//   }

//   async setToken(id, token) {
//     await this.updateToken(id, token);
//   }

//   async updateToken(id, token) {
//     return await User.updateOne({ _id: id }, { token });
//   }
// }
// const authService = new AuthService();

module.exports = {
  auth,
  generateToken,
  // authService,
};
