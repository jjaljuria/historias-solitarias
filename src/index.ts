import express from "express";
import "./database";
import AuthorRouter from "./routes/AuthorRoute";

const app = express();
app.use(express.json());

app.use("/api", AuthorRouter);

app.listen(3000, () => {
  console.log("server on port 3000");
});

export { app };
