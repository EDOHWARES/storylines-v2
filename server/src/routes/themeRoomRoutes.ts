import express from "express";
import * as themeRoomControllerV1 from "../controllers/v1/themeRoomController"

const router = express.Router();

router.get('/', themeRoomControllerV1.getAllThemeRooms)
router.post('/', themeRoomControllerV1.createThemeRoom);
router.get('/:id', themeRoomControllerV1.getSingleThemeRoom)

export default router