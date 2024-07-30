import React from 'react';
import StoryList from "../components/StoryList"
import CreateStoryForm from '../components/CreateStoryForm';

const App: React.FC = () => {
  return (
    <div className="App">
      <StoryList />
      <CreateStoryForm />
    </div>
  );
};

export default App