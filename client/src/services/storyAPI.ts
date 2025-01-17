import axios from 'axios';
import { Story } from '../types/Story';

const API_URL = '/api/v1';

export const getStories = async (): Promise<Story[]> => {
  const response = await axios.get<Story[]>(`${API_URL}/stories`);
  return response.data;
};

export const createStory = async (story: Partial<Story>): Promise<Story> => {
  const response = await axios.post<Story>(`${API_URL}/stories`, story);
  return response.data;
};

export const fetchStoriesByThemeRoomId = async(id: string) : Promise<Story[]> => {
  const response = await axios.get<Story[]>(`${API_URL}/stories/theme-rooms/${id}`)
  // console.log(`Axios data: ${JSON.stringify(response.data)}`)
  return response.data
}

export const fetchSingleStory = async(id:string) : Promise<Story> => {
  const response = await axios.get<Story>(`${API_URL}/stories/${id}`)
  return response.data
}

export const fetchFilteredStories = async (storyIds: string[]): Promise<Story[]> => {
  if (storyIds.length === 0) {
    return [];
  }

  try {
    const response = await axios.post<Story[]>(`${API_URL}/stories/filtered`, {
      storyIds,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching filtered stories:', error);
    throw error;
  }
};