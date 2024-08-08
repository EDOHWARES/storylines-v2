import React from 'react';
import { ChevronRight, Check, Bookmark, BadgePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Story } from '../../types/Story';
import { Handle, Position } from '@xyflow/react';
import { Card } from "../../components/ui/card";
import {Button} from "../../components/ui/button"

interface StoryNodeProps {
    data: Story;
}

const StoryNode: React.FC<StoryNodeProps> = ({ data }) => {
    const navigate = useNavigate();

    const handleStoryClick = () => {
        navigate(`/story`, { state: data });
    };

    const handleCreateStoryClick = () => {
        navigate(`/create-story`, { state: { prevStoryId: data._id } });
    };

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className="relative w-full max-w-md">
            <Handle
                type="target"
                position={Position.Top}
                className={`w-3 h-3 ${data.prev.length > 0 ? 'bg-primary' : 'bg-transparent border-none'}`}
                style={{ top: -8, left: '50%', transform: 'translateX(-50%)' }}
            />
            <Card className="p-6 bg-background text-foreground shadow-lg rounded-xl border border-border">
                <div className="space-y-4">
                    <div>
                        <h3 className="text-xl font-semibold">{data.title}</h3>
                        <p className="text-gray-600 text-sm">{data.content.substring(0, 100)}...</p>
                    </div>
                    <div className="flex items-center justify-between text-gray-500 text-sm">
                        <div className="flex items-center gap-2">
                            <p>Anonymous</p>
                        </div>
                        <span>{formatDate(data.createdAt)}</span>
                    </div>
                    <Button
                        onClick={handleStoryClick}
                        variant="custom2"
                    >
                        Read More
                        <ChevronRight className="ml-1 w-4 h-4" />
                    </Button>
                </div>
                <div className="absolute -top-3 -right-3 flex space-x-2">
                    <button className="p-1.5 rounded-full bg-neutral-100 dark:bg-neutral-900 shadow-sm hover:shadow-md transition-all duration-200 border border-border hover:-translate-y-0.5">
                        <Check className="w-4 h-4 text-green-500" />
                    </button>
                    <button className="p-1.5 rounded-full bg-neutral-100 dark:bg-neutral-900 shadow-sm hover:shadow-md transition-all duration-200 border border-border hover:-translate-y-0.5">
                        <Bookmark className="w-4 h-4 text-blue-500" />
                    </button>
                    <button
                        onClick={handleCreateStoryClick}
                        className="p-1.5 rounded-full bg-neutral-100 dark:bg-neutral-900 shadow-sm hover:shadow-md transition-all duration-200 border border-border hover:-translate-y-0.5"
                    >
                        <BadgePlus className="w-4 h-4 text-purple-500" />
                    </button>
                </div>
            </Card>
            <Handle
                type="source"
                position={Position.Bottom}
                className={`w-3 h-3 ${data.next.length > 0 ? 'bg-primary' : 'bg-transparent border-none'}`}
                style={{ bottom: -8, left: '50%', transform: 'translateX(-50%)' }}
            />
        </div>
    );
};

export default StoryNode;
