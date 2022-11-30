import express from "express";
import "./database";
import * as Handlebars from "express-handlebars";
import path from "path";
import AuthorRouter from "./routes/AuthorRoute";
import StoryRouter from "./routes/StoryRoute";

const app = express();
app.set("views", path.join(__dirname, "views"));
// app.engine(
//   ".hbs",
//   handlebars.engine({
//     // defaultLayout: "main",
//     // layoutsDir: path.join(app.get("views"), "layouts"),
//     // partialsDir: path.join(app.get("views"), "partials"),
//     extname: ".hbs",
//     runtimeOptions: {
//       allowProtoPropertiesByDefault: true,
//       allowProtoMethodsByDefault: true,
//     },
//   })
// );
app.engine(
  "hbs",
  Handlebars.engine({
    defaultLayout: false,
  })
);

app.set("view engine", "hbs");

// Middlewares
app.use(express.json());

// Routes
app.use("/api", AuthorRouter);
app.use("/api", StoryRouter);

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, () => {
  console.log("server on port 3000");
});

export { app };
