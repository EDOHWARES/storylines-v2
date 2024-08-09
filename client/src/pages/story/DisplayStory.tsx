import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Story } from '../../types/Story';
import LoadingScreen from '../../components/layout/LoadingScreen';
import { fetchFilteredStories } from '../../services/storyAPI';
import { sanitizeHtml } from '../../utils/htmlSanitizer';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
        return <div className="text-red-500 text-center mt-20">{error}</div>;
    }

    if (!story) {
        return <div className="text-center mt-20">No story found</div>;
    }

    return (
        <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6 sm:p-8">
                    <Link 
                        to={`/story-map/${story.themeRoomId}`}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors duration-200"
                    >
                        <ChevronLeft className="w-5 h-5 mr-1" />
                        Back to theme room
                    </Link>

                    <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">{story.title}</h1>
                    
                    <div className="mb-4 text-gray-600">
                        <span className="font-semibold">Authors:</span> {story.author.join(', ')}
                    </div>
                    
                    <div className="mb-6 text-gray-600">
                        <span className="font-semibold">Theme Room:</span> {story.themeRoomId}
                    </div>
                    
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-3 text-gray-700">Story Content:</h2>
                        <div 
                            className="prose prose-sm sm:prose lg:prose-lg max-w-none"
                            dangerouslySetInnerHTML={{ __html: sanitizeHtml(story.content) }}
                        />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6 mb-8">
                        {prevStories.length > 0 && (
                            <div>
                                <h2 className="text-xl font-bold mb-3 text-gray-700">Previous Stories</h2>
                                <ul className="space-y-2">
                                    {prevStories.map((prevStory) => (
                                        <li key={prevStory._id}>
                                            <button
                                                onClick={() => handleStoryClick(prevStory)}
                                                className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
                                            >
                                                <ChevronLeft className="inline w-4 h-4 mr-1" />
                                                {prevStory.title}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {nextStories.length > 0 && (
                            <div>
                                <h2 className="text-xl font-bold mb-3 text-gray-700">Next Stories</h2>
                                <ul className="space-y-2">
                                    {nextStories.map((nextStory) => (
                                        <li key={nextStory._id}>
                                            <button
                                                onClick={() => handleStoryClick(nextStory)}
                                                className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
                                            >
                                                {nextStory.title}
                                                <ChevronRight className="inline w-4 h-4 ml-1" />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => navigate(-1)}
                        className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-lg font-semibold"
                    >
                        Back to Stories
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DisplayStory;