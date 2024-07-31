import express from "express";
import * as storyControllerV1 from "../controllers/v1/storyController";

const router = express.Router();

// Specific routes first
router.get('/theme-rooms/:themeRoomId', storyControllerV1.getStoriesByThemeRoomId);  // Update here
router.get('/theme-rooms', storyControllerV1.getStoriesByThemeRooms);

// General routes
router.get('/', storyControllerV1.getAllStories);
router.post('/', storyControllerV1.createStory);

// This should come last as it's the most general
router.get('/:id', storyControllerV1.getSingleStory);


export default router;  