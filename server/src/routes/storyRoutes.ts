import express from "express";
import * as storyControllerV1 from "../controllers/v1/storyController";

const router = express.Router();

router.get('/', storyControllerV1.getAllStories);
router.post('/', storyControllerV1.createStory);
router.get('/:id', storyControllerV1.getSingleStory);

export default router;  