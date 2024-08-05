import React from 'react';
import { Button } from '../../components/ui/button';
import { IconArrowRight } from '@tabler/icons-react';

const cards = [
    {
        heading: "Interactive Storytelling",
        description: "Craft branching narratives where every choice matters. Your decisions shape the story's path.",
        color : "bg-custom-orange"
    },
    {
        heading: "Collaborative Worlds",
        description: "Join forces with other writers to build expansive universes filled with interconnected tales.",
        color : "bg-custom-pink"
    },
    {
        heading: "Reader Engagement",
        description: "Involve your audience directly in the storytelling process. Let them influence the narrative direction.",
        color : "bg-custom-green"
    }
];

const Hero: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-background text-foreground">
            <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                    Craft Your Infinite Story
                </h1>
                <p className="text-sm sm:text-base mb-8">
                    Dive into a world where every reader is a writer, and every story branches into endless possibilities. Connect, create, and explore narratives that evolve with each contribution.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <Button variant="primaryBtn" className="w-full sm:w-auto">Start Writing</Button>
                    <Button variant="secondaryBtn" className="w-full sm:w-auto group flex items-center justify-center sm:justify-between">
                        Explore Stories
                        <IconArrowRight className="ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                    </Button>
                </div>
            </div>
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className={`border-2 border-foreground rounded-lg shadow-md 
                                       flex flex-col justify-between
                                       transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105
                                       min-h-[300px] lg:min-h-[350px] ${card.color}`}
                        >
                            <div className="flex items-center justify-center flex-grow">
                                <h3 className="text-2xl font-semibold text-center">
                                    {card.heading}
                                </h3>
                            </div>
                            <p className="mt-4 text-sm border-t-2 border-black p-2">
                                {card.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Hero