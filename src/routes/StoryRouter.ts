import { Router } from "express";
import * as StoryController from "../controllers/StoryController";
import isAuthenticated from "../middlewares/isAuthenticated";

const router: Router = Router();

router.get("/stories", StoryController.getStories);
router.get("/story/:id", StoryController.getStory);
router.get("/new-story", StoryController.newStory);
router.get("/update-story/:id", StoryController.updateStory);

router.delete("/story", isAuthenticated, StoryController.deleteStory);
router.post("/new-story", isAuthenticated, StoryController.saveStory);
router.put("/story", isAuthenticated, StoryController.saveUpdatedStory);

export default router;
