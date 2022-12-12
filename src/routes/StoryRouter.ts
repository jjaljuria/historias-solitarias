import { Router } from "express";
import * as StoryController from "../controllers/StoryController";
import { isUniqueTitle } from "../middlewares/isUniqueTitle";

const router: Router = Router();

router.get("/stories", StoryController.getStories);
router.get("/story/:id", StoryController.getStory);
router.get("/new-story", StoryController.newStory);
router.get("/update-story/:id", StoryController.updateStory);

router.delete("/story", StoryController.deleteStory);
router.post("/new-story", StoryController.saveStory);
router.put("/story", StoryController.saveUpdatedStory);

export default router;
