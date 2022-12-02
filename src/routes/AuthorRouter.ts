import { Router } from "express";
import * as AuthorController from "../controllers/AuthorController";

const router: Router = Router();

router.get("/author/:id", AuthorController.getAuthor);

router.get("/logup", AuthorController.logUp);
export default router;
