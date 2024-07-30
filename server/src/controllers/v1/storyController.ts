import { Request, Response } from "express";
import * as storyService from "../../services/v1/storyService";

export const getAllStories = async (req: Request, res: Response): Promise<void> => {
  try {
    const stories = await storyService.getAllStories();
    res.json(stories)
  } catch (error) {
    res.status(500).json({ message: "Error fetching stories", error })
  }
}

export const createStory = async (req: Request, res: Response): Promise<void> => {
  try {
    const story = await storyService.createStory(req.body);
    res.status(201).json(story);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error creating story', error });
  }
};