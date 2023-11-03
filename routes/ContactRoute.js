const express = require("express");
const router = express.Router();
const controller = require("../controller/ContactController");

router.post("/contact", controller.createContact);

router.get("/getallcontact", controller.getAllContacts);

module.exports = router;
