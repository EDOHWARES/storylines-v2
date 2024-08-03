import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Story } from "../../types/Story";
import LoadingScreen from '../../components/layout/LoadingScreen';
import { fetchFilteredStories } from '../../services/storyAPI';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';

interface LocationState {
  currentStory: Story;
  prevStories: Story[];
  nextStories: Story[];
  prevStoriesToFind: string[];
  nextStoriesToFind: string[];
  themeRoomId: string;
}

const StoryDetails = () => {
  const location = useLocation();
  const [state, setState] = useState<LocationState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      setState(location.state as LocationState);
    }
  }, [location]);

  useEffect(() => {
    const fetchMissingStories = async () => {
      if (!state) return;
      const { prevStoriesToFind, nextStoriesToFind, prevStories, nextStories } = state;
      if (prevStoriesToFind.length === 0 && nextStoriesToFind.length === 0) return;
      
      setIsLoading(true);
      try {
        const allStoriesToFind = [...prevStoriesToFind, ...nextStoriesToFind];
        const missingStories = await fetchFilteredStories(allStoriesToFind);
        
        const newPrevStories = [
          ...prevStories,
          ...missingStories.filter(story => prevStoriesToFind.includes(story._id))
        ];
        const newNextStories = [
          ...nextStories,
          ...missingStories.filter(story => nextStoriesToFind.includes(story._id))
        ];

        setState(prevState => ({
          ...prevState!,
          prevStories: newPrevStories,
          nextStories: newNextStories,
          prevStoriesToFind: [],
          nextStoriesToFind: []
        }));
      } catch (err) {
        setError("Unable to fetch related stories")
      } finally {
        setIsLoading(false);
      }
    };

    fetchMissingStories();
  }, [state]);

  const handleStoryClick = (story: Story) => {
    const newState: LocationState = {
      currentStory: story,
      prevStories: [],
      nextStories: [], 
      prevStoriesToFind: story.prev,
      nextStoriesToFind: story.next,
      themeRoomId: state ? state.themeRoomId : ''
    };
    navigate(`/story/${story._id}`, { state: newState });
  };

  const renderStoryLink = (story: Story, label: string, icon: React.ReactNode) => (
    <button
      onClick={() => handleStoryClick(story)}
      className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200 ease-in-out"
    >
      {icon}
      <span className="ml-2">{label}</span>
    </button>
  );

  const renderStoryPreview = (story: Story, type: 'prev' | 'next') => (
    <div key={story._id} className="mb-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out">
      <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
      <p className="mb-4 text-gray-600">{story.content.substring(0, 100)}...</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          by {story.author.join(', ')}
        </span>
        {renderStoryLink(
          story, 
          type === 'prev' ? "Read previous" : "Read next",
          type === 'prev' ? <ChevronLeft size={16} /> : <ChevronRight size={16} />
        )}
      </div>
    </div>
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!state) {
    return <div className="flex justify-center items-center h-screen">
      <p className="text-xl text-gray-600">Error: No story data available</p>
    </div>;
  }

  const { currentStory, prevStories, nextStories, themeRoomId } = state;

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link to={`/room/${themeRoomId}`} className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-8">
          <ArrowLeft size={20} className="mr-2" />
          Back to Theme Room
        </Link>
        
        <h1 className="text-4xl font-bold mb-6 text-gray-800">{currentStory.title}</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <p className="mb-6 text-gray-700 leading-relaxed whitespace-pre-wrap">{currentStory.content}</p>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Authors:</h3>
            <ul className="list-disc list-inside text-gray-600">
              {currentStory.author.map((author, index) => (
                <li key={index}>{author}</li>
              ))}
            </ul>
          </div>
        </div>

        {(prevStories.length > 0 || nextStories.length > 0) && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Story Connections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-700">Previous Stories</h3>
                {prevStories.length > 0 ? (
                  prevStories.map(story => renderStoryPreview(story, 'prev'))
                ) : (
                  <p className="text-gray-500">No previous stories.</p>
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-700">Next Stories</h3>
                {nextStories.length > 0 ? (
                  nextStories.map(story => renderStoryPreview(story, 'next'))
                ) : (
                  <p className="text-gray-500">No next stories.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryDetails;