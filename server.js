require("dotenv").config();
const express = require("express");
const path = require("path");
const logger = require("morgan");
const favicon = require("serve-favicon");

require("./config/database");

// Require controllers here

const app = express();

// add in when the app is ready to be deployed
// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));
// Configure the auth middleware
// This decodes the jwt token, and assigns
// the user information to req.user
app.use(require("./config/auth"));
// api routes must be before the "catch all" route
app.use("/api/users", require("./routes/api/users"));
app.use("/api/search", require("./routes/api/search"));
app.use("/api/saved", require("./routes/api/saved"));

// "catch all" route
// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

app.get("/", (req, res) => {
  res.status(200).json({ message: "Backend is running!" });
});

const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Express app listening on port ${port}`);
});
