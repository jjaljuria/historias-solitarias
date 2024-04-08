import passport from "passport";
import { Strategy } from "passport-local";
import { Author, IAuthor } from "./models/Author";

passport.use(
  new Strategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        const author = await Author.findOne({ email });

        if (!author) {
          return done(null, false, { message: "Email is not exist" });
        }

        const isPassword = await author.matchPassword(password);
        if (isPassword) {
          return done(null, author);
        }
      } catch (err) {
        return done(err);
      }

      return done(null, false, { message: "Password is Incorrect" });
    }
  )
);

passport.serializeUser((author: any, done) => {
  done(null, author.id);
});

passport.deserializeUser((id, done) => {
  Author.findById(id, (err: any, author: IAuthor) => {
    done(err, author);
  });
});
