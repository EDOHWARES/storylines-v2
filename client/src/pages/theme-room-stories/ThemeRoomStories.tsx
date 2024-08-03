"use client";
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import LoadingScreen from '../../components/layout/LoadingScreen';
import { ThemeRoom } from '../../types/ThemeRoom';
import { Story } from "../../types/Story"
import { getSingleThemeRoom } from '../../services/themeRoomAPI';
import { fetchStoriesByThemeRoomId } from "../../services/storyAPI";

const ThemeRoomStories = () => {
    const { id } = useParams<{ id: string }>();
    const [themeRoom, setThemeRoom] = useState<ThemeRoom | null>(null);
    const [stories, setStories] = useState<Story[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchThemeRoom = async () => {
            try {
                setIsLoading(true);
                if (!id) {
                    throw new Error('Theme room ID is undefined');
                }
                const response = await getSingleThemeRoom(id);
                setThemeRoom(response)
            } catch (err) {
                console.error('Error fetching theme room:', err);
                setError(err instanceof Error ? err.message : 'An error occurred while fetching the theme room');
            } finally {
                setIsLoading(false);
            }
        };

        fetchThemeRoom();
    }, [id]);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                setIsLoading(true);
                if (!id) {
                    throw new Error('Theme room ID is undefined');
                }
                const response = await fetchStoriesByThemeRoomId(id);
                setStories(response)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred while fetching the stories')
            } finally {
                setIsLoading(false)
            }
        }
        fetchStories();
    }, [id]);

    // Sending story details to the view page
    // Send the entire story details to the view page. Also, try to find the previous stories and the next stories of the current story if they are already present. If not, send an API call to the database to find only those stories which are not currently present

    // Go through each story id in the array
    // Find if the story to be searched is present in the stories
    // If present, add them to its respective array
    // If not, add the storyId to an array that needs to be searched

    const getCurrentStoryDetails = (storyId: string, story: Story) => {
        const prevStoryIds = story.prev;
        const nextStoryIds = story.next;
        const prevStoriesToFind: string[] = [];
        const nextStoriesToFind: string[] = [];
    
        const prevStories = prevStoryIds.map(id => {
            const foundStory = stories.find(s => s._id === id);
            if (!foundStory) {
                prevStoriesToFind.push(id);
            }
            return foundStory;
        }).filter((story): story is Story => story !== undefined);
    
        const nextStories = nextStoryIds.map(id => {
            const foundStory = stories.find(s => s._id === id);
            if (!foundStory) {
                nextStoriesToFind.push(id);
            }
            return foundStory;
        }).filter((story): story is Story => story !== undefined);
    
        return {
            currentStory: story,
            prevStories,
            nextStories,
            prevStoriesToFind,
            nextStoriesToFind,
            id: id
        };
    };
    
    const handleStoryClick = async (story: Story) => {
        const storyDetails = getCurrentStoryDetails(story._id, story);
        
        // If there are stories to find, you might want to fetch them here
        if (storyDetails.prevStoriesToFind.length > 0 || storyDetails.nextStoriesToFind.length > 0) {
            // Assuming you have a function to fetch multiple stories by their IDs
            // const missingStories = await fetchStoriesByIds([...storyDetails.prevStoriesToFind, ...storyDetails.nextStoriesToFind]);
            // You might want to update your state with these missing stories
            // setStories(prevStories => [...prevStories, ...missingStories]);
            
            // For now, we'll just log this information
            console.log("Stories to fetch:", [...storyDetails.prevStoriesToFind, ...storyDetails.nextStoriesToFind]);
        }
    
        navigate(`/story/${story._id}`, { state: storyDetails });
    };

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!themeRoom) {
        return <div>Theme room not found</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{themeRoom.name}</h1>
            <p className="mb-4">{themeRoom.description}</p>
            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Tags:</h2>
                <div className="flex flex-wrap gap-2">
                    {themeRoom.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-200 rounded-full px-3 py-1 text-sm">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <br />
            <br />
            <div className='flex flex-wrap justify-between'>
                {stories.map(story => (
                    <div key={story._id} onClick={() => handleStoryClick(story)} className="cursor-pointer p-4 border rounded m-2">
                        <h2 className="text-xl font-semibold">{story.title}</h2>
                        <p className="mt-2">{story.content.substring(0, 100)}...</p>
                        <div className="mt-2">
                            {story.author.map((user, index) => (
                                <span key={index} className="mr-2 text-sm text-gray-600">{user}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ThemeRoomStories;