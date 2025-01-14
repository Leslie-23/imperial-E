const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", function () {
  console.log(`Connected to MongoDB at \n${db.host}:\n${db.port}`);
});

db.on("error", function (err) {
  console.log(`Mongodb error: ${err}`);
});
