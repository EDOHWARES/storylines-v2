import { Request, Response } from "express";
import * as themeRoomService from "../../services/v1/themeRoomService";
import mongoose, { Error as MongooseError } from "mongoose";

// http://localhost:5000/api/v1/theme-rooms
export const getAllThemeRooms = async (req: Request, res: Response): Promise<void> => {
    try {
        const themeRooms = await themeRoomService.getAllThemeRooms();
        if (!themeRooms.length) {
            res.status(404).json({ message: 'No theme rooms found' });
            return;
        }
        res.json(themeRooms);
    } catch (error) {
        console.error('Error fetching theme rooms:', error);
        if (error instanceof MongooseError) {
            res.status(500).json({ message: "Database error while fetching theme rooms", error: error.message });
        } else {
            res.status(500).json({ message: "Unexpected error while fetching theme rooms", error: (error as Error).message });
        }
    }
}

// http://localhost:5000/api/v1/theme-rooms
export const createThemeRoom = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.body.name || typeof req.body.name !== 'string' || req.body.name.length > 20) {
            res.status(400).json({ message: 'Invalid or missing name. Name must be a string with maximum length of 20 characters.' });
            return;
        }
        if (!req.body.description || typeof req.body.description !== 'string' || req.body.description.length > 100) {
            res.status(400).json({ message: 'Invalid or missing description. Description must be a string with maximum length of 100 characters.' });
            return;
        }
        if (!Array.isArray(req.body.tags) || req.body.tags.some((tag: any) => typeof tag !== 'string')) {
            res.status(400).json({ message: 'Invalid or missing tags. Tags must be an array of strings.' });
            return;
        }

        const { name, description, tags } = await themeRoomService.createThemeRoom(req.body);
        const newThemeRoom: { name?: string; description?: string; tags?: string[] } = {};
       
        if (name !== undefined) newThemeRoom.name = name;
        if (description !== undefined) newThemeRoom.description = description;
        if (tags !== undefined) newThemeRoom.tags = tags;
        res.status(201).json(newThemeRoom);
    } catch (error) {
        console.error('Error creating theme room:', error);
        if (error instanceof MongooseError.ValidationError) {
            res.status(400).json({ message: 'Validation error', error: error.message });
        } else if (error instanceof MongooseError) {
            res.status(500).json({ message: 'Database error while creating theme room', error: error.message });
        } else {
            res.status(500).json({ message: 'Unexpected error while creating theme room', error: (error as Error).message });
        }
    }
};

// http://localhost:5000/api/v1/theme-rooms/{themeRoomId}
export const getSingleThemeRoom = async (req: Request, res: Response): Promise<void> => {
    try {
        const { themeRoomId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(themeRoomId)) {
            res.status(400).json({ message: "Invalid theme room ID format" });
            return;
        }
        const themeRoom = await themeRoomService.getSingleThemeRoom(themeRoomId);
        if (!themeRoom) {
            res.status(404).json({ message: "Theme room not found" });
            return;
        }
        res.json(themeRoom);
    } catch (error) {
        console.error('Error locating theme room:', error);
        if (error instanceof MongooseError.CastError) {
            res.status(400).json({ message: "Invalid theme room ID format", error: error.message });
        } else if (error instanceof MongooseError) {
            res.status(500).json({ message: "Database error while locating theme room", error: error.message });
        } else {
            res.status(500).json({ message: "Unexpected error while locating theme room", error: (error as Error).message });
        }
    }
}