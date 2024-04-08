import mongoose from "mongoose";
import config from "./config";

mongoose
  .connect(config.DATABASE_URI)
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => console.error(err));
