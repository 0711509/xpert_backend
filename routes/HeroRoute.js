const express = require("express");
const router = express.Router();
const controller = require("../controller/Herocontroller");

router.post("/createhero", controller.createHero);

module.exports = router;
