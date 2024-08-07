import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeRoom } from "../../types/ThemeRoom";
import { getAllThemeRooms } from "../../services/themeRoomAPI";
import LoadingScreen from "../../components/layout/LoadingScreen";
import { capitalize } from "../../utils/capitalize";
import { Input } from '../../components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../components/ui/select";
import { Button } from '../../components/ui/button';
import { IconSearch, IconHeart, IconLayoutGrid } from '@tabler/icons-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

const Home = () => {
  const [themeRooms, setThemeRooms] = useState<ThemeRoom[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('activity');
  const [layoutView, setLayoutView] = useState('grid');
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

  if (isLoading) return <LoadingScreen />;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

  const filteredRooms = themeRooms.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleRoomClick = (roomId: string) => {
    navigate(`/story-map/${roomId}`);
  };

  return (
    <div className="flex-grow p-4 md:p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <Header />
        <SearchAndFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
          layoutView={layoutView}
          setLayoutView={setLayoutView}
        />
        <ThemeRoomGrid
          rooms={filteredRooms}
          handleRoomClick={handleRoomClick}
          layoutView={layoutView}
        />
      </div>
    </div>
  );
}

const Header = () => (
  <div className="flex justify-between items-center mb-6 md:mb-8">
    <h1 className="text-3xl md:text-4xl font-bold">Theme Rooms</h1>
  </div>
);

const SearchAndFilterBar = ({ searchTerm, setSearchTerm, sortBy, setSortBy, layoutView, setLayoutView }) => (
  <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-2 bg-background space-y-4 md:space-y-0 md:space-x-4 rounded-lg mb-6">
    <div className="relative flex-1 w-full md:w-auto">
      <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search Repositories and Projects..."
        className="pl-8 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
    <div className="flex items-center space-x-2 w-full md:w-auto">
      <div className='select w-full md:w-auto'>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sort by activity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="activity">Sort By Activity</SelectItem>
            <SelectItem value="name">Sort By Name</SelectItem>
            <SelectItem value="popularity">Sort By Popularity</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* <div className="layout-format border-border">
        <Tabs value={layoutView} onValueChange={setLayoutView} className='border-border'>
          <TabsList>
            <TabsTrigger value="grid">
              <Button variant="outline" className='bg-transparent' size="icon">
                <IconLayoutGrid className="h-4 w-4" />
              </Button>
            </TabsTrigger>
            <TabsTrigger value="list">
              <Button variant="outline" size="icon">
                <IconLayoutGrid className="h-4 w-4 rotate-90" />
              </Button>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div> */}
    </div>
  </div>
);

const ThemeRoomGrid = ({ rooms, handleRoomClick, layoutView }) => (
  <div className={`grid gap-6 ${layoutView === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
    {rooms.map((room) => (
      <ThemeRoomCard key={room._id} room={room} onClick={() => handleRoomClick(room._id)} />
    ))}
  </div>
);

const ThemeRoomCard = ({ room, onClick }) => (
  <Card
    className="h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 cursor-pointer"
    onClick={onClick}
  >
    <CardHeader className="relative">
      <FavoriteButton />
      <CardTitle>{room.name}</CardTitle>
    </CardHeader>
    <CardContent className="flex-grow">
      <p className="text-sm text-muted-foreground">{room.description}</p>
    </CardContent>
    <CardFooter>
      <TagList tags={room.tags} />
    </CardFooter>
  </Card>
);

const FavoriteButton = () => (
  <Button
    variant="ghost"
    size="icon"
    className="absolute top-2 right-2 hover:bg-transparent"
    onClick={(e) => {
      e.stopPropagation();
      // Add favorite logic here
    }}
  >
    <IconHeart className="h-5 w-5" />
  </Button>
);

const TagList = ({ tags }) => (
  <div className="flex flex-wrap gap-2">
    {tags.map((tag, index) => (
      <Badge key={index} variant="secondary">
        {capitalize(tag)}
      </Badge>
    ))}
  </div>
);

export default Home;