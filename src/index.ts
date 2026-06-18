import "dotenv/config";
import express from "express";

import mongoose from "mongoose";
import logger from "morgan";
import cors from "cors";
import crudRoutes from "./routes/crud";
const app = express();
const port = process.env.PORT || 4000;
const url = process.env.MONGO_DB_URL;

mongoose
  .connect(url as string)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log("Error:", error);
  });

app.use(logger("dev"));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/crud", crudRoutes);

app.use(function (req, res, next) {
  res.status(404).send({
    message: "Route not found",
  });
});

app.listen(port, () => {
  console.log(`The server is up... on port ${port}`);
});
