"use client";
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import LoadingScreen from '../../components/layout/LoadingScreen';
import { ThemeRoom } from '../../types/ThemeRoom';
import { Story } from "../../types/Story"
import { getSingleThemeRoom } from '../../services/themeRoomAPI';
import { fetchStoriesByThemeRoomId } from "../../services/storyAPI";
import { ArrowLeft, PlusCircle } from 'lucide-react';

const ThemeRoomStories: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [themeRoom, setThemeRoom] = useState<ThemeRoom | null>(null);
    const [stories, setStories] = useState<Story[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (!id) {
                setError('Theme room ID is undefined');
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                const [themeRoomResponse, storiesResponse] = await Promise.all([
                    getSingleThemeRoom(id),
                    fetchStoriesByThemeRoomId(id)
                ]);
                setThemeRoom(themeRoomResponse);
                setStories(storiesResponse);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const getCurrentStoryDetails = (story: Story) => {
        const prevStories = story.prev.map(id => stories.find(s => s._id === id)).filter(Boolean) as Story[];
        const nextStories = story.next.map(id => stories.find(s => s._id === id)).filter(Boolean) as Story[];

        return {
            currentStory: story,
            prevStories,
            nextStories,
            prevStoriesToFind: story.prev.filter(id => !prevStories.some(s => s._id === id)),
            nextStoriesToFind: story.next.filter(id => !nextStories.some(s => s._id === id)),
            themeRoomId: id
        };
    };

    const handleStoryClick = (story: Story) => {
        const storyDetails = getCurrentStoryDetails(story);
        navigate(`/story/${story._id}`, { state: storyDetails });
    };

    

    const handleCreateStory = () => {
        // Navigate to story creation page or open a modal
        navigate(`/create-story`);
    };

    if (isLoading) return <LoadingScreen />;
    if (error) return <div>Error: {error}</div>;
    if (!themeRoom) return <div>Theme room not found</div>;

    return (
        <div className="p-8">
            <Link to="/home" className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-8">
                <ArrowLeft size={20} className="mr-2" />
                Back to Homepage
            </Link>
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

            {stories.length === 0 ? (
                <div className="text-center mt-8">
                    <p className="mb-4">No stories yet. Be the first to create one!</p>
                    <button
                        onClick={handleCreateStory}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                    >
                        <PlusCircle size={20} className="mr-2" />
                        Create Your First Story
                    </button>
                </div>
            ) : (
                <div className='flex flex-wrap justify-between mt-8'>
                    {stories.map(story => (
                        <div key={story._id} onClick={() => handleStoryClick(story)} className="cursor-pointer p-4 border rounded m-2 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)]">
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
            )}
        </div>
    );
}

export default ThemeRoomStories;