import Story, { IStory } from "../../models/Story";
import mongoose from "mongoose";

export const getAllStories = async (): Promise<IStory[]> => {
    return Story.find().sort({ createdAt: -1 });
}

export const getSingleStory = async (id: string): Promise<IStory | null> => {
    const currId = new mongoose.Types.ObjectId(id);
    return Story.findById(currId);
}

export const createStory = async (storyData: Partial<IStory>): Promise<IStory> => {
    const _id = new mongoose.Types.ObjectId();

    const newStory: Partial<IStory> = {
        _id,
        ...storyData,
        prev: storyData.prev ? (Array.isArray(storyData.prev) ? storyData.prev : [storyData.prev]) : [],
        next: [],
        customId: storyData.customId || new mongoose.Types.ObjectId().toString() // Ensure unique customId
    };

    // Ensure 'prev' is always an array
    newStory.prev = newStory.prev || [];

    if (newStory.prev.length > 0) {
        newStory.prev = newStory.prev.map(id => new mongoose.Types.ObjectId(id));

        // Update the 'next' field of the previous stories
        for (const prevStoryId of newStory.prev) {
            const prevStory = await getSingleStory(prevStoryId.toString());
            if (prevStory) {
                prevStory.next = prevStory.next || [];
                prevStory.next.push(_id);
                await prevStory.save();
            }
        }
    }

    const story = new Story(newStory);
    return story.save();
};