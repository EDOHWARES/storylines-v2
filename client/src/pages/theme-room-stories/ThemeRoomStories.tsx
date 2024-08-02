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

    // const getCurrentStoryDetails = (storyId: string) => {
    //     const currentStory = stories.find(story => story._id === storyId);
        
    //     if (!currentStory) {
    //         console.error('Story not found');
    //         return null;
    //     }

    //     const prevStories = currentStory.prev.map(prevId => {
    //         return stories.find(story => story._id === prevId);
    //     }).filter((story): story is Story => story !== undefined);

    //     const nextStories = currentStory.next.map(nextId => {
    //         return stories.find(story => story._id === nextId);
    //     }).filter((story): story is Story => story !== undefined);

    //     return {
    //         currentStory,
    //         prevStories,
    //         nextStories
    //     };
    // }

    // const handleRoomClick = (storyId: string) => {
    //     const storyDetails = getCurrentStoryDetails(storyId);
    //     if (storyDetails) {
    //         navigate(`/story/${storyId}`, { state: storyDetails });
    //     } else {
    //         console.error('Unable to navigate: story details not found');
    //     }
    // };

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
            <div className='flex justify-between'>
                {stories.map(story => (
                    <div key={story._id}>
                        <h1>{story.title}</h1>
                        <p>{story.content}</p>
                        {
                            story.author.map((user, index) => (
                                <p key={index}>{user}</p>
                            ))
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ThemeRoomStories;