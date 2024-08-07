import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home-page/Home';
import Favorites from './pages/Favorites';
import Settings from './pages/Settings';
import Help from './pages/Help';
import ThemeRoomStories from './pages/theme-room-stories/ThemeRoomStories';
import StoryDetails from './pages/story/StoryDetails';
import CreateStory from './pages/create-story/CreateStory';
import LandingPage from './pages/landing-page/LandingPage';
import DisplayStory from './pages/story/DisplayStory';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />
        <Route path="/room/:id" element={<ThemeRoomStories />} />
        {/* <Route path="story/:id" element={<StoryDetails />} /> */}
        <Route path="story" element={<DisplayStory />} />
        <Route path="/create-story" element={<CreateStory />} />
      </Routes>
    </div>
  );
};

export default App;