import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Settings from './pages/Settings';
import Help from './pages/Help';
import { ThemeProvider } from './components/layout/theme-provider';

const App: React.FC = () => {
  return (
    <div className="App">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="layout md:flex md:space-x-8">
          <Sidebar />
          <div className="content ml-16 md:ml-64 p-8">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
            </Routes>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default App;