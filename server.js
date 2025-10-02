const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const quizRoutes = require("./routes/quizRoutes");

const app = express();

const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

const mongoURI = "mongodb://localhost:27017/quizdb";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/quizzes", quizRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
