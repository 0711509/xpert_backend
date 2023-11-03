const ErrorHandler = require("../utils/ErrorHandler");
const Prisma = require("../prisma/db");

module.exports = {
  createHero: async (req, res, next) => {
    try {
      const { content } = req.body;
      if (!content) {
        return next(
          new ErrorHandler(
            "Plaese Enter The Content Which You Want To Chnage",
            400
          )
        );
      }
      await Prisma.hero.create({
        data: {
          content: content,
        },
      });
      res.status(200).json({
        success: true,
        message: "Hero Content Update Successfuly",
      });
    } catch (error) {
      next(new ErrorHandler(error.message, 400));
    }
  },
};
