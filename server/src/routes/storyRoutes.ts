import express from "express";
import * as storyControllerV1 from "../controllers/v1/storyController";

const router = express.Router();

// Specific routes first
router.get('/theme-rooms/:themeRoomId', storyControllerV1.fetchStoriesByThemeRoomId);  // Update here
router.get('/theme-rooms', storyControllerV1.fetchStoriesByThemeRooms);

// General routes
router.get('/', storyControllerV1.fetchAllStories);
router.post('/', storyControllerV1.createStory);

// This should come last as it's the most general
router.get('/:id', storyControllerV1.fetchSingleStory);


export default router;  