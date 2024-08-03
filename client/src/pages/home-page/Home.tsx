import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeRoom } from "../../types/ThemeRoom";
import { getAllThemeRooms } from "../../services/themeRoomAPI";
import LoadingScreen from "../../components/layout/LoadingScreen"
import { Search, Plus } from 'lucide-react';
import { capitalize } from "../../utils/capitalize"

const Home = () => {
  const [themeRooms, setThemeRooms] = useState<ThemeRoom[]>([]);
  const [error, setError] = useState<string | null>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchThemeRooms = async () => {
      try {
        setIsLoading(true);
        const response = await getAllThemeRooms();
        setThemeRooms(response);
      } catch (error) {
        setError(error as string);
      } finally {
        setIsLoading(false);
      }
    }
    fetchThemeRooms();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) return <div>Error: {error}</div>;

  const filteredRooms = themeRooms.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleRoomClick = (roomId: string) => {
    navigate(`/room/${roomId}`);
  };

  return (
    <div className="flex-grow p-8 overflow-y-auto">
      <div className="w-max-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Theme Rooms</h1>
          <div className="flex items-center gap-2">
            <Plus size={20} />
            <p className='hidden md:block'>Create Room</p>
          </div>
        </div>
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search rooms..."
            className="w-full px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <div 
              key={room._id} 
              className="rounded-xl p-6 h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 cursor-pointer"
              onClick={() => handleRoomClick(room._id)}
            >
              <h2 className="text-xl font-semibold mb-2">{room.name}</h2>
              <p className="mb-4 flex-grow">{room.description}</p>
              <div className="flex flex-wrap gap-2">
                {room.tags.map((tag, index) => (
                  <span key={index} className="text-xs font-medium px-2 py-1 rounded-full">
                    {capitalize(tag)}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;