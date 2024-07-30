import express from "express";
import * as themeRoomControllerV1 from "../controllers/v1/themeRoomController"

const router = express.Router();

router.get('/', themeRoomControllerV1.getAllThemeRooms)

export default router