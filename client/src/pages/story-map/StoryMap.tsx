"use client";
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import LoadingScreen from '../../components/layout/LoadingScreen';
import { ThemeRoom } from '../../types/ThemeRoom';
import { Story } from "../../types/Story"
import { getSingleThemeRoom } from '../../services/themeRoomAPI';
import { fetchStoriesByThemeRoomId } from "../../services/storyAPI";
import { PlusCircle } from 'lucide-react';
import StoryTree from './StoryTree';
import { Button } from '../../components/ui/button';

const StoryMap: React.FC = () => {
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

    const handleCreateStory = () => {
        navigate(`/create-story`, { state : {themeRoomId : id, rootNode: true}});
    };

    if (isLoading) return <LoadingScreen />;
    if (error) return <div>Error: {error}</div>;
    if (!themeRoom) return <div>Theme room not found</div>;

    return (
        <div className="h-screen">
            {stories.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full">
                    <p className="mb-4 text-center">No stories yet. Be the first to create one!</p>
                    {/* <button
                        
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                    >
                        <PlusCircle size={20} className="mr-2" />
                        Create Your First Story
                    </button> */}
                    <Button onClick={handleCreateStory}>
                        <PlusCircle size={20} className="mr-2" />
                        Create Your First Story
                    </Button>
                </div>
            ) : (
                <StoryTree stories={stories} />
            )}
        </div>
    );
}

export default StoryMap;