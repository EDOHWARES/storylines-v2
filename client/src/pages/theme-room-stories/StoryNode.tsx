import React from 'react';

const StoryNode = ({ data }) => {
    return (
        <div>
            <div className="p-4 shadow-md rounded-md bg-white border-2 border-gray-200">


                <div className="font-bold text-lg mb-2">{data.title}</div>

                <div className="text-sm mb-1">
                    <span className="font-semibold">Authors:</span> {data.author.join(', ')}
                </div>

                <div className="text-sm mb-1">
                    <span className="font-semibold">Theme Room:</span> {data.themeRoomId}
                </div>

                <div className="text-sm mb-2">
                    <span className="font-semibold">Content:</span>
                    <p className="italic">{data.content.substring(0, 50)}...</p>
                </div>

            </div>
        </div>
    )
}

export default StoryNode