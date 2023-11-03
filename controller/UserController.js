const Prisma = require("../prisma/db");
const ErrorHandler = require("../utils/ErrorHandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

module.exports = {
  // ---- create user
  createUser: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return next(new ErrorHandler("Please Enter All Fields", 400));
      }
      if (!validator.isEmail(email)) {
        return next(new ErrorHandler("Invalid email address", 400));
      }

      const userExists = await Prisma.user.findFirst({
        where: {
          email: email,
        },
      });
      if (userExists) {
        return next(
          new ErrorHandler("Email Already Exists, Please Login", 400)
        );
      }
      // Hash Password
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await Prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      res.status(200).json({
        success: true,
        message: "Registration Successfully",
        data: user,
      });
    } catch (error) {
      next(new ErrorHandler(error.message, 400));
    }
  },
  //   ---- login user
  loginUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new ErrorHandler("please enter all fields", 400));
      }
      if (!validator.isEmail(email)) {
        return next(new ErrorHandler("Invalid email address", 400));
      }
      const user = await Prisma.user.findFirst({
        where: {
          email: email,
        },
      });
      if (!user) {
        return next(new ErrorHandler("Invalid Credentials", 400));
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return next(new ErrorHandler("Please enter a valid information", 400));
      }
      // ---create token
      const token = await jwt.sign({ id: user }, process.env.JWT_SECRECT, {
        expiresIn: "7d",
      });
      res.status(200).json({
        success: true,
        message: "Login Successfuly",
        token,
      });
    } catch (error) {
      next(new ErrorHandler(error.message, 400));
    }
  },
};
