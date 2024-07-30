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

export const createThemeRoom = async (req: Request, res: Response): Promise<void> => {
    try {
        const themeRoom = await themeRoomService.createThemeRoom(req.body);
        res.json(themeRoom);
    } catch (error) {
        res.status(500).json({ message: 'Error creating theme room', error });
    }
}

export const getSingleThemeRoom = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const themeRoom = await themeRoomService.getSingleThemeRoom(id);
        res.json(themeRoom);
    } catch (error) {
        res.status(500).json({ message: "Error locating theme room", error })
    }
}