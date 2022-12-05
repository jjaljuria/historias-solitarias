import passport from "passport";
import { Strategy } from "passport-local";
import { Author, IAuthor } from "./models/Author";

passport.use(
  new Strategy(
    {
      usernameField: "username",
    },
    async (username, password, done) => {
      const author = await Author.findOne({ username });

      if (!author) {
        return done(null, false, { message: "Author not found" });
      }

      const isPassword = await author.matchPassword(password);
      if (isPassword) {
        return done(null, author);
      }

      return done(null, false, { message: "Incorrect Password" });
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
