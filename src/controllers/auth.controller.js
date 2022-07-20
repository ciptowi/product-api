const { User } = require("../db/models");

function format(user) {
  const { id, email } = user;
  return {
    id,
    email,
    accessToken: user.generateToken(),
  };
}

signUp = async (req, res) => {
  try {
    User.register(req.body).then((data) => {
      return res.status(201).json({
        status: "OK",
        result: data,
        errors: {},
      });
    });
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      result: {},
      errors: {
        message: error.message,
      },
    });
  }
};
signIn = (req, res) => {
  try {
    User.authenticate(req.body)
      .then((user) => {
        const token = format(user).accessToken;
        return res.status(201).json({
          status: "OK",
          result: {
            access_token: token,
          },
          errors: {},
        });
      })
      .catch((msg) => {
        return res.status(401).json({
          status: "FAILED",
          result: {
            message: msg,
          },
          errors: {},
        });
      });
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      result: {},
      errors: {
        message: error.message,
      },
    });
  }
};

const auth = {
  signUp,
  signIn,
};
module.exports = auth;
