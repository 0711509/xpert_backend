const prisma = require("../prisma/db");
const ErrorHandler = require("../utils/ErrorHandler");
const validator = require("validator");

module.exports = {
  createContact: async (req, res, next) => {
    try {
      const { name, email, mobilenumber, message } = req.body;
      console.log(name, email, mobilenumber, message);
      if (!name || !email || !mobilenumber || !message) {
        return next(new ErrorHandler("Please Enter All Fileds", 400));
      }
      if (!validator.isEmail(email)) {
        return next(new ErrorHandler("Invalid email address", 400));
      }
      const contact = await prisma.contact.create({
        data: {
          name: name,
          email: email,
          phoneNumber: mobilenumber,
          message: message,
        },
      });
      res.status(200).json({
        success: true,
        message: "Your Form Submit Successfuly",
      });
    } catch (error) {
      next(new ErrorHandler(error.message, 400));
    }
  },

  // ====
  getAllContacts: async (req, res, next) => {
    try {
      // Query the database to get all contacts
      const contacts = await prisma.contact.findMany();

      res.status(200).json({
        success: true,
        data: contacts,
      });
    } catch (error) {
      next(new ErrorHandler(error.message, 400));
    }
  },
};
