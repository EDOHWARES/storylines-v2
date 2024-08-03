import React, { useEffect, useState } from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import { Story } from "../../types/Story";
import LoadingScreen from '../../components/layout/LoadingScreen';
import { fetchFilteredStories } from '../../services/storyAPI';

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
  const [state, setState] = useState<LocationState | undefined>(location.state as LocationState | undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        setError('Failed to fetch some related stories');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMissingStories();
  }, [state]);

  if (!state || !state.currentStory) {
    return <Navigate to={`/room/${state?.themeRoomId || ''}`} replace />;
  }

  const { currentStory, prevStories, nextStories, themeRoomId } = state;

  const renderStoryLink = (story: Story, label: string) => (
    <Link
      to={`/story/${story._id}`}
      state={{ ...state, currentStory: story }}
      className="text-blue-500 hover:underline"
    >
      {label}
    </Link>
  );

  const renderStoryPreview = (story: Story) => (
    <div key={story._id} className="mb-4 p-4 border rounded shadow">
      <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
      <p className="mb-2">{story.content.substring(0, 100)}...</p>
      {renderStoryLink(story, "Read full story")}
    </div>
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{currentStory.title}</h1>
      
      <div className="mb-4 flex justify-between text-sm">
        <div>
          {prevStories.map((story, index) => (
            <span key={story._id} className="mr-2">
              {renderStoryLink(story, `← Previous ${index + 1}`)}
            </span>
          ))}
        </div>
        <div>
          {nextStories.map((story, index) => (
            <span key={story._id} className="ml-2">
              {renderStoryLink(story, `Next ${index + 1} →`)}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Previous Stories</h2>
        {prevStories.length > 0 ? (
          prevStories.map(renderStoryPreview)
        ) : (
          <p>No previous stories.</p>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Current Story</h2>
        <p className="mb-4 whitespace-pre-wrap">{currentStory.content}</p>
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Authors:</h3>
          <ul className="list-disc list-inside">
            {currentStory.author.map((author, index) => (
              <li key={index}>{author}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Next Stories</h2>
        {nextStories.length > 0 ? (
          nextStories.map(renderStoryPreview)
        ) : (
          <p>No next stories.</p>
        )}
      </div>

      {error && (
        <div className="mt-4 text-sm text-red-600">
          <p>{error}</p>
        </div>
      )}

      <div className="mt-8">
        <Link to={`/room/${themeRoomId}`} className="text-blue-500 hover:underline">
          ← Back to Theme Room
        </Link>
      </div>
    </div>
  );
};

export default StoryDetails;