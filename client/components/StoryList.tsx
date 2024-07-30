import React, { useEffect, useState } from 'react';
import { getStories } from "../services/api"
import { Story } from '../types/Story';

const StoryList: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const fetchedStories = await getStories();
        setStories(fetchedStories);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch stories');
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Stories</h1>
      {stories.map((story) => (
        <div key={story._id}>
          <h2>{story.title}</h2>
          <p>Author: {story.author}</p>
          <p>{story.content.substring(0, 200)}...</p>
        </div>
      ))}
    </div>
  );
};

export default StoryList;