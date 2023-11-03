const express = require("express");
const app = express();

// --- dotenv
require("dotenv").config();

// --------- body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

// --- cors
const cors = require("cors");
app.use(cors());

// --- router
app.use("/api/user", require("./routes/UserRoute"));
app.use("/api", require("./routes/ContactRoute"));
app.use("/api/hero", require("./routes/HeroRoute"));

// ---server
const Server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

// ===errorHandler
process.on("uncaughtException", (error) => {
  console.log(`uncaughtException error ${error.message}`);
  console.log("Server is shutting down");
  Server.close(() => {
    process.exit(1);
  });
});

process.on("unhandledRejection", (error) => {
  console.log(`Uncaught promise rejections: ${error.message}`);
  console.log("Server is shutting down");
  Server.close(() => {
    process.exit(1);
  });
});

app.use(require("./middleware/error"));
