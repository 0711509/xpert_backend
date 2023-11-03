const express = require("express");
const router = express.Router();
const controller = require("../controller/UserController");

router.post("/signup", controller.createUser);
router.post("/login", controller.loginUser);

module.exports = router;
