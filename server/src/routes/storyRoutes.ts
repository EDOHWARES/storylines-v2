import express from "express";
import * as storyControllerV1 from "../controllers/v1/storyController";

const router = express.Router();

router.get('/', storyControllerV1.getAllStories);
router.post('/', storyControllerV1.createStory);

export default router;  