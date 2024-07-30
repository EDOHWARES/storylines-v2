import Story, { IStory } from "../../models/Story";

export const getAllStories = async (): Promise<IStory[]> => {
    return Story.find().sort({ createdAt: -1 });
}

export const createStory = async (storyData: Partial<IStory>): Promise<IStory> => {
    const story = new Story(storyData);
    return story.save();
};