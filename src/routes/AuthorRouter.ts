import { Router } from "express";
import * as AuthorController from "../controllers/AuthorController";
import passport from "passport";

const router: Router = Router();

router.get("/author/:id", AuthorController.getAuthor);

router.get("/login", AuthorController.login);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  AuthorController.verifyAuthor
);

router.get(
  "/edit-author",
  passport.authenticate("local"),
  AuthorController.editAuthor
);
router.put(
  "/author",
  passport.authenticate("local"),
  AuthorController.updateAuthor
);

router.get("/logup", AuthorController.logUp);
export default router;
