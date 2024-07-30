import ThemeRoom, { IThemeRoom } from "../../models/ThemeRoom";

export const getAllThemeRooms = async (): Promise<IThemeRoom[]> => {
    return ThemeRoom.find()
}