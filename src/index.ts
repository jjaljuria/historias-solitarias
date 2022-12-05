import express from "express";
import "./database";
import * as Handlebars from "express-handlebars";
import path from "path";
import AuthorRouter from "./routes/AuthorRouter";
import StoryRouter from "./routes/StoryRouter";
import IndexRouter from "./routes/IndexRouter";
import Helpers from "./views/helpers";
import passport from "passport";

import "./passport";
const app = express();
app.set("views", path.join(__dirname, "views"));

app.engine(
  "hbs",
  Handlebars.engine({
    extname: "hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
    helpers: Helpers,
  })
);

app.set("view engine", "hbs");

// Middlewares
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", IndexRouter);
app.use(AuthorRouter);
app.use(StoryRouter);

// Static Files
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/css",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js"))
);

app.listen(3000, () => {
  console.log("server on port 3000");
});

export { app };
