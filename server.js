const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 8080;
const apiRoutes = require("./routes/api-routes");
const htmlRoutes = require("./routes/html-routes");

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use(htmlRoutes);
app.use("/api", apiRoutes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log("Server listening on: http://localhost:" + PORT);
});