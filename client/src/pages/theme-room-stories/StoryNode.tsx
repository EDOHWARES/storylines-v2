import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Story } from '../../types/Story';

interface StoryNodeProps {
    data: Story;
}

const StoryNode: React.FC<StoryNodeProps> = ({ data }) => {
    console.log(JSON.stringify(data));
    const navigate = useNavigate();

    
    const handleStoryClick = () => {
        navigate(`/story`, { state: data });
    };

    return (
        <div className="rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <div className="p-6">
                <h2 className="font-bold text-xl mb-2 text-gray-800">{data.title}</h2>
                <p className="text-gray-600 text-sm mb-4">{data.content.substring(0, 100)}...</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span>Theme room id: {data.themeRoomId}</span>
                </div>
                <button
                    onClick={handleStoryClick}
                    className="flex items-center text-blue-500 hover:text-blue-600 transition-colors duration-300 ease-in-out"
                >
                    Read more
                    <ChevronRight className="ml-1 w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default StoryNode;