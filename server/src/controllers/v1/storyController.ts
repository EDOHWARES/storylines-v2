import { Request, Response } from "express";
import * as storyService from "../../services/v1/storyService";
import mongoose from "mongoose";

export const getAllStories = async (req: Request, res: Response): Promise<void> => {
  try {
    const stories = await storyService.getAllStories();
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stories", error });
  }
}

export const getSingleStory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const story = await storyService.getSingleStory(id);
    res.json(story);
  } catch (error) {
    res.status(500).json({ message: "Error locating story", error });
  }
}

export const createStory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, type, content, author, themeRoomId, prev } = req.body;
    const story = await storyService.createStory({
      title,
      type : type || "child",
      content,
      author: author.map((id: string) => new mongoose.Types.ObjectId(id)),
      themeRoomId: new mongoose.Types.ObjectId(themeRoomId),
      prev: prev ? prev.map((id: string) => new mongoose.Types.ObjectId(id)) : []
    });
    res.status(201).json(story);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating story', error });
  }
};

export const getStoriesByThemeRooms = async(req: Request, res: Response): Promise<void> => {
  try {
    const storiesByThemeRooms = await storyService.getStoriesByThemeRooms();
    res.json(storiesByThemeRooms);
  } catch(error) {
    console.error(error);
    res.status(500).json({message: 'Error fetching stories by theme rooms', error});
  }
}

export const getStoriesByThemeRoomId = async(req: Request, res: Response): Promise<void> => {
  try {
    console.log("here to fetch stories by theme room id")
    const { themeRoomId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(themeRoomId)) {
      res.status(400).json({ message: 'Invalid themeRoomId' });
      return;
    }
    const stories = await storyService.getStoriesByThemeRoomId(themeRoomId);
    res.json(stories);
  } catch(error) {
    console.error(error);
    res.status(500).json({message: 'Error fetching stories for theme room', error});
  }
}