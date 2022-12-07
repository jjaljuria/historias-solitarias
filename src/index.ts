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
import session from "express-session";
import morgan from "morgan";
import MongoStore from "connect-mongodb-session";

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

const MongoDBStore = MongoStore(session);
const store = new MongoDBStore({
  uri: "mongodb://localhost:27017/historias_solitarias",
  collection: "sessions",
  expires: 1000 * 60 * 60 * 24 * 14,
});

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    store,
    cookie: {
      sameSite: true,
      maxAge: 1000 * 60 * 60 * 24 * 12,
    },
  })
);
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

app.use(morgan("dev"));
app.listen(3000, () => {
  console.log("server on port 3000");
});

export { app };
