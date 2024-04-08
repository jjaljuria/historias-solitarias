import { Router } from "express";
import * as IndexController from "../controllers/IndexController";

const router = Router();

router.get("/", IndexController.home);

export default router;
