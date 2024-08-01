import React, { useEffect, useState } from 'react';
import { getThemeRooms } from "../services/themeRoomAPI";
import { getStories } from "../services/storyAPI";
import { ThemeRoom } from '../types/ThemeRoom';
import { Story } from "../types/Story";
import { Button } from "../components/ui/button";
import LoadingScreen from '../components/layout/LoadingScreen';

const Home = () => {
  const [themeRooms, setThemeRooms] = useState<ThemeRoom[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchThemeRooms = async () => {
      try {
        const rooms = await getThemeRooms();
        setThemeRooms(rooms);
      } catch (err) {
        setError('Failed to fetch theme rooms');
      } finally {
        setLoading(false);
      }
    };

    // Simulate loading delay for 5 seconds
    const loadWithDelay = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 5000));
      fetchThemeRooms();
    };

    loadWithDelay();
  }, []);

  const showStories = async () => {
    try {
      const fetchedStories = await getStories();
      setStories(fetchedStories);
    } catch (err) {
      setError('Failed to fetch stories');
    }
  };

  if (loading) return <LoadingScreen />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Theme Rooms</h1>
      {themeRooms.map((room) => (
        <div key={room._id}>
          <h2>{room.name}</h2>
          <p>{room.description}</p>
        </div>
      ))}
      <div className="story">
        <Button variant="ghost" onClick={showStories}>Show Stories</Button>
        {stories.length > 0 && (
          <div>
            {stories.map((story) => (
              <div key={story._id}>
                <h3>{story.title}</h3>
                <p>{story.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
