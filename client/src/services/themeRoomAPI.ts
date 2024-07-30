import axios from "axios";
import { ThemeRoom } from "../types/ThemeRoom";

const API_URL = 'http://localhost:5000/api/v1';

export const getThemeRooms = async(): Promise<ThemeRoom[]> => {
    const response = await axios.get<ThemeRoom[]>(`${API_URL}/themerooms`);
    return response.data;
}