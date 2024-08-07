import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Story } from "../../types/Story";
import { createStory } from '../../services/storyAPI';

interface CreateStoryProps {
  rootNode?: boolean;
}

const CreateStory: React.FC<CreateStoryProps> = ({ rootNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [storyTitle, setStoryTitle] = useState<string>('');
  const [storyContent, setStoryContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const prevStoryId = location.state?.prevStoryId;
  const themeRoomId = location.state?.themeRoomId;

  // useEffect(() => {
  //   console.log(rootNode ? 'true' : 'false');
  // }, [rootNode]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const newStory: Partial<Story> = {
        title: storyTitle,
        content: storyContent,
        type: rootNode ? 'root' : 'child',
        themeRoomId: themeRoomId,
        prev: prevStoryId ? [prevStoryId] : [],
        author: ['66a8449eb7c52cb3dec16071'],
      };

      const createdStory = await createStory(newStory);
      console.log('Story created successfully:', createdStory);
      navigate('/'); // or wherever you want to redirect after creation
    } catch (err) {
      console.error('Error creating story:', err);
      setError('Failed to create story. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <p onClick={() => navigate(-1)} className='text-blue-400 cursor-pointer'>Go back</p>
          <label htmlFor="storyTitle" className="block text-sm font-medium text-gray-700">Enter a title:</label>
          <input
            type="text"
            id="storyTitle"
            value={storyTitle}
            onChange={(e) => setStoryTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="storyContent" className="block text-sm font-medium text-gray-700">Enter content:</label>
          <textarea
            id="storyContent"
            value={storyContent}
            onChange={(e) => setStoryContent(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows={5}
            required
          ></textarea>
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Story'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateStory;