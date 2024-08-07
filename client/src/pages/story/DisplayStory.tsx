import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Story } from '../../types/Story';
import LoadingScreen from '../../components/layout/LoadingScreen';
import { fetchFilteredStories } from '../../services/storyAPI';

const DisplayStory: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [story, setStory] = useState<Story | null>(null);
    const [fetchedStories, setFetchedStories] = useState<Story[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (location.state as Story) {
            setStory(location.state as Story);
        }
    }, [location.state]);

    useEffect(() => {
        if (story) {
            const relatedStories = [...story.prev, ...story.next];
            const fetchStories = async () => {
                try {
                    setIsLoading(true);
                    const storiesToFetch = await fetchFilteredStories(relatedStories);
                    setFetchedStories(storiesToFetch);
                } catch (error) {
                    setError("Unable to fetch related stories");
                } finally {
                    setIsLoading(false);
                }
            };
            fetchStories();
        }
    }, [story]);

    const prevStories = fetchedStories.filter(fetchedStory => story?.prev.includes(fetchedStory._id));
    const nextStories = fetchedStories.filter(fetchedStory => story?.next.includes(fetchedStory._id));

    const handleStoryClick = (clickedStory: Story) => {
        navigate(`/story`, { state: clickedStory });
    };

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!story) {
        return <div>No story found</div>;
    }

    return (
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">

            <div className="back-to-theme-room">
                <Link to={`/story-map/${story.themeRoomId}`}>
                <p>Go back to theme room</p>
                </Link>
            </div>

            <h1 className="text-3xl font-bold mb-4">{story.title}</h1>
            <div className="mb-4">
                <span className="font-semibold">Authors:</span> {story.author.join(', ')}
            </div>
            <div className="mb-4">
                <span className="font-semibold">Theme Room:</span> {story.themeRoomId}
            </div>
            <div className="mb-6">
                <span className="font-semibold">Content:</span>
                <p className="mt-2 whitespace-pre-wrap">{story.content}</p>
            </div>

            {prevStories.length > 0 && (
                <div className="mb-4">
                    <h2 className="text-xl font-bold mb-2">Previous Stories</h2>
                    <ul className="list-disc pl-5">
                        {prevStories.map((prevStory) => (
                            <li key={prevStory._id}>
                                <button
                                    onClick={() => handleStoryClick(prevStory)}
                                    className="text-blue-500 hover:underline cursor-pointer"
                                >
                                    {prevStory.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {nextStories.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-xl font-bold mb-2">Next Stories</h2>
                    <ul className="list-disc pl-5">
                        {nextStories.map((nextStory) => (
                            <li key={nextStory._id}>
                                <button
                                    onClick={() => handleStoryClick(nextStory)}
                                    className="text-blue-500 hover:underline cursor-pointer"
                                >
                                    {nextStory.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <button
                onClick={() => navigate(-1)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
            >
                Back to Stories
            </button>
        </div>
    );
};

export default DisplayStory;