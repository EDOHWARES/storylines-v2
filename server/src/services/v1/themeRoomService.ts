import ThemeRoom, { IThemeRoom } from "../../models/ThemeRoom";
import mongoose from "mongoose";

export const getAllThemeRooms = async (): Promise<IThemeRoom[]> => {
    return ThemeRoom.find()
}

export const createThemeRoom = async (themeRoomData: Partial<IThemeRoom>) : Promise<IThemeRoom> => {
    const themeRoom = new ThemeRoom(themeRoomData);
    return themeRoom.save();
}

export const getSingleThemeRoom = async(id: string) : Promise<IThemeRoom | null> => {
    const currId = new mongoose.Types.ObjectId(id)
    const themeRoom = ThemeRoom.findById(currId)
    return themeRoom;
}