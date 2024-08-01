import axios from 'axios';
import { Story } from '../types/Story';
import {User} from "../types/User"

const API_URL = '/api/v1';

export const getStories = async (): Promise<Story[]> => {
  const response = await axios.get<Story[]>(`${API_URL}/stories`);
  return response.data;
};

export const createStory = async (story: Partial<Story>): Promise<Story> => {
  const response = await axios.post<Story>(`${API_URL}/stories`, story);
  return response.data;
};

export const createUser = async (user:Partial<User>) : Promise<User> => {
  console.log("Here to create user");
  const response = await axios.post<User>(`${API_URL}/users`, user);
  return response.data;
}