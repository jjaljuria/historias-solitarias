import { Router } from "express";
import * as UserController from "../controllers/AuthorController";

const router: Router = Router();

router.get("/author/:id", UserController.getAuthor);

export default router;
