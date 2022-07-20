"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config/auth");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static #encrypt = (password) => bcrypt.hashSync(password, 10);
    checkPassword = (password) => bcrypt.compareSync(password, this.password);
    generateToken = () => {
      const payload = {
        id: this.id,
        email: this.email,
      };
      const token = jwt.sign(payload, config.secret);
      return token;
    };

    static register = ({ name, email, password }) => {
      const encryptedPassword = this.#encrypt(password);
      return this.create({
        name,
        email,
        password: encryptedPassword,
      });
    };

    static authenticate = async ({ email, password }) => {
      try {
        const user = await this.findOne({ where: { email } });
        if (!user) return Promise.reject("Failed! email Not found.");
        const isPasswordValid = user.checkPassword(password);
        if (!isPasswordValid) return Promise.reject("Failed! Wrong Password");
        return Promise.resolve(user);
      } catch (err) {
        return Promise.reject(err);
      }
    };
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
