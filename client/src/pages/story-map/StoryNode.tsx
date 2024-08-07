import React from 'react';
import { ChevronRight, Check, Bookmark, BadgePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Story } from '../../types/Story';
import { Handle, Position } from '@xyflow/react';

interface StoryNodeProps {
    data: Story;
}

const StoryNode: React.FC<StoryNodeProps> = ({ data }) => {
    const navigate = useNavigate();

    const handleStoryClick = () => {
        navigate(`/story`, { state: data });
    };

    const handleCreateStoryClick = (storyId: string) => {
        navigate(`/create-story`, {
            state: {
                prevStoryId: storyId,
                themeRoomId: data.themeRoomId
            }
        });
    }

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className="relative">
            <Handle
                type="target"
                position={Position.Top}
                className={`${data.prev.length > 0 ? 'bg-black' : 'bg-transparent'}`}
                style={{ top: -4, left: '50%', transform: 'translateX(-50%)' }}
            />
            <div className="bg-white rounded-lg overflow-visible shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
                <div className="p-6 space-y-4">
                    <h2 className="font-bold text-xl text-gray-800">{data.title}</h2>
                    <p className="text-gray-600 text-sm">{data.content.substring(0, 100)}...</p>
                    <div className="flex justify-between flex-col text-left space-y-2 text-gray-500 text-sm">
                        <span>Theme room id: {data.themeRoomId}</span>
                        <span>Created: {formatDate(data.createdAt)}</span>
                        <p>Story Id: {data._id}</p>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                        <button
                            onClick={handleStoryClick}
                            className="flex items-center text-blue-500 hover:text-blue-600 transition-colors duration-200"
                        >
                            Read more
                            <ChevronRight className="ml-1 w-4 h-4" />
                        </button>
                    </div>
                </div>
                <div className="absolute -top-3 -right-3 flex space-x-2">
                    <button className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                        <Check className="w-4 h-4 text-green-500" />
                    </button>
                    <button className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                        <Bookmark className="w-4 h-4 text-blue-500" />
                    </button>
                    <button 
                        onClick={() => handleCreateStoryClick(data._id)} 
                        className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                    >
                        <BadgePlus className="w-4 h-4 text-purple-500" />
                    </button>
                </div>
            </div>
            <Handle
                type="source"
                position={Position.Bottom}
                className={`${data.next.length > 0 ? 'bg-black' : 'bg-transparent'}`}
                style={{ bottom: -4, left: '50%', transform: 'translateX(-50%)' }}
            />
        </div>
    );
};

export default StoryNode;