import React from 'react';
import Sidebar from './components/layout/Sidebar';
import Home from './pages/Home';
import { ThemeProvider } from './components/layout/theme-provider';


const App: React.FC = () => {
  return (
    <div className="App">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="layout md:flex md:space-x-8">
          <Sidebar />
          <div className="content ml-16 md:ml-64 p-8">
            <Home />
          </div>
        </div>
      </ThemeProvider>

    </div>
  );
};

export default App;
