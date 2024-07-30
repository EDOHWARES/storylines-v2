import React, { useEffect, useState } from 'react';
import { getThemeRooms } from "../services/themeRoomAPI";
import { ThemeRoom } from '../types/ThemeRoom';

const Home = () => {

  const [themeRooms, setThemeRooms] = useState<ThemeRoom[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchThemeRooms = async () => {
      try {
        const rooms = await getThemeRooms()
        setThemeRooms(rooms)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch theme rooms')
        setLoading(false)
      }
    }

    fetchThemeRooms()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h1>Theme Rooms</h1>
      {themeRooms.map((room) => (
        <div key={room._id}>
          <h1>{room._id}</h1>
          <h2>{room.name}</h2>
          <p>{room.description}</p>
        </div>
      ))}
    </div>
  )
}

export default Home