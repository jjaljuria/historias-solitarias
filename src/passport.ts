import passport from "passport";
import { Strategy } from "passport-local";
import { Author, IAuthor, IAuthorModel } from "./models/Author";

passport.use(
  new Strategy(
    {
      usernameField: "username",
    },
    async (username, password, done) => {
      try {
        const author = await Author.findOne({ username });

        if (!author) {
          return done(null, false, { message: "Username is not exist" });
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
