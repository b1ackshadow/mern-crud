const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

mongoose.connect(
  process.env.DATA_BASE,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;

mongoose.connection.on("error", err => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});
app.set("port", process.env.PORT || 5000);

app.listen(app.get("port"), () => {
  console.log(`Server running on port ${app.get("port")}`);
});
