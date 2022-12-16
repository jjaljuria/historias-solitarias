import express from "express";
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
import config from "./config";
import methodOverride from "method-override";
import setPartialsData from "./middlewares/setPartialsData";
import { ifError } from "assert";
import { nextTick } from "process";

const app = express();
app.set("views", path.join(__dirname, "views"));

app.engine(
  "hbs",
  Handlebars.engine({
    extname: "hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
      data: { isAuthenticated: true },
    },
    helpers: Helpers,
  })
);

app.set("view engine", "hbs");

const MongoDBStore = MongoStore(session);
const store = new MongoDBStore({
  uri: config.DATABASE_URI,
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
app.use(methodOverride("_method"));
app.use(setPartialsData);

// Routes
app.use("/", IndexRouter);
app.use(AuthorRouter);
app.use(StoryRouter);

app.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.trace(err);
    }

    res.redirect("/");
  });
});

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

export { app };
