import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/historias_solitarias")
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => console.error(err));
