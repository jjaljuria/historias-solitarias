import { Router } from "express";
import * as StoryController from "../controllers/StoryController";

const router: Router = Router();

router.get("/stories", StoryController.getStories);
router.get("/story/:id", StoryController.getStory);

export default router;
