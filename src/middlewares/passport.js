const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const passport = require("passport");
const config = require("../config/auth");
const { User } = require("../db/models");

async function authenticate(email, password, done) {
  try {
    const user = await User.authenticate({ email, password });
    return done(null, user);
  } catch (error) {
    return done(null, false, { message: error.message });
  }
}

const options = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: config.secret,
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    User.findByPk(payload.id)
      .then((user) => done(null, user))
      .catch((err) => done(err, false));
  })
);

module.exports = passport;
