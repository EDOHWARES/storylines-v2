import ThemeRoom, { IThemeRoom } from "../../models/ThemeRoom";
import mongoose, { Error as MongooseError } from "mongoose";

// http://localhost:5000/api/v1/theme-rooms
export const getAllThemeRooms = async (): Promise<IThemeRoom[]> => {
    try {
        const themeRooms = await ThemeRoom.find();
        if (themeRooms.length === 0) {
            throw new Error('No theme rooms found');
        }
        return themeRooms;
    } catch (error) {
        if (error instanceof MongooseError) {
            throw new Error(`Database error while fetching theme rooms: ${error.message}`);
        } else {
            throw new Error(`Error fetching theme rooms: ${(error as Error).message}`);
        }
    }
}

// http://localhost:5000/api/v1/theme-rooms
export const createThemeRoom = async (themeRoomData: Partial<IThemeRoom>): Promise<IThemeRoom> => {
    try {
        // Validate required fields
        if (!themeRoomData.name || typeof themeRoomData.name !== 'string') {
            throw new Error('Name is required and must be a string');
        }
        if (!themeRoomData.description || typeof themeRoomData.description !== 'string') {
            throw new Error('Description is required and must be a string');
        }
        if (!Array.isArray(themeRoomData.tags)) {
            throw new Error('Tags must be an array');
        }
        if (themeRoomData.name.length > 20) {
            throw new Error('Name must not exceed 20 characters');
        }
        if (themeRoomData.description.length > 100) {
            throw new Error('Description must not exceed 100 characters');
        }
        
        const themeRoom = new ThemeRoom(themeRoomData);
        const savedThemeRoom = await themeRoom.save();
        return savedThemeRoom;
    } catch (error) {
        if (error instanceof MongooseError.ValidationError) {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            throw new Error(`Validation error: ${validationErrors.join(', ')}`);
        } else if (error instanceof MongooseError.CastError) {
            throw new Error(`Invalid data format: ${error.message}`);
        } else if (error instanceof MongooseError) {
            throw new Error(`Database error: ${error.message}`);
        } else {
            throw new Error(`Error creating theme room: ${(error as Error).message}`);
        }
    }
};

// http://localhost:5000/api/v1/theme-rooms/{themeRoomId}
export const getSingleThemeRoom = async (id: string): Promise<IThemeRoom> => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid theme room ID format');
        }
        const themeRoom = await ThemeRoom.findById(id);
        if (!themeRoom) {
            throw new Error('Theme room not found');
        }
        return themeRoom;
    } catch (error) {
        if (error instanceof MongooseError.CastError) {
            throw new Error(`Invalid theme room ID format: ${error.message}`);
        } else if (error instanceof MongooseError) {
            throw new Error(`Database error while fetching theme room: ${error.message}`);
        } else {
            throw new Error(`Error fetching theme room: ${(error as Error).message}`);
        }
    }
}