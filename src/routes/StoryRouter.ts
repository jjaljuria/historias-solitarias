import { Router } from "express";
import * as StoryController from "../controllers/StoryController";
import { isUniqueTitle } from "../middlewares/isUniqueTitle";

const router: Router = Router();

router.get("/stories", StoryController.getStories);
router.get("/story/:id", StoryController.getStory);
router.delete("/story", StoryController.deleteStory);
router.get("/new-story", StoryController.newStory);
router.post("/new-story", StoryController.saveStory);

export default router;
