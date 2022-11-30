import express from "express";
import "./database";
import AuthorRouter from "./routes/AuthorRoute";
import StoryRouter from "./routes/StoryRoute";

const app = express();
app.use(express.json());

app.use("/api", AuthorRouter);
app.use("/api", StoryRouter);

app.listen(3000, () => {
  console.log("server on port 3000");
});

export { app };
