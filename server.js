require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/users", userRoutes);

mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => {
    app.listen(process.env.API_URI, () => {
      console.log("listening on", process.env.API_URI);
    });
  })
  .catch((err) => {
    console.log(err);
  });
