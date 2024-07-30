import { Request, Response } from "express";
import * as themeRoomService from "../../services/v1/themeRoomService";

export const getAllThemeRooms = async (req: Request, res: Response): Promise<void> => {
    try {
        const themeRooms = await themeRoomService.getAllThemeRooms();
        res.json(themeRooms)
    } catch (error) {
        res.status(500).json({ message: "Error fetching theme rooms", error })
    }
}