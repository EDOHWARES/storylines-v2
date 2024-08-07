import React from 'react';
import { IconPencil, IconSearch, IconRoad, IconUsers, IconBulb } from '@tabler/icons-react';
import { BentoGrid, BentoCard } from "../../components/magicui/bento-grid";

import collaborateImage from '../../assets/images/landing-page/collaborate.svg';
import exploreImage from '../../assets/images/landing-page/explore.svg';
import choosePathImage from '../../assets/images/landing-page/choose_path.svg';
import writeBranchImage from '../../assets/images/landing-page/write_branch.svg';
import inspiredImage from '../../assets/images/landing-page/inspired.svg';


const features = [
    {
        Icon: IconPencil,
        name: "Write & Branch",
        description: "Create the first node of your story and watch it branch into infinite possibilities.",
        href: "/",
        cta: "Learn more",
        background: <img src={writeBranchImage} className="absolute -top-50 mt-5" />,
        className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    },
    {
        Icon: IconSearch,
        name: "Explore Stories",
        description: "Dive into a vast universe of interconnected tales crafted by our community.",
        href: "/",
        cta: "Learn more",
        background: <img src={exploreImage} className="absolute -top-20 mt-5" />,
        className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    },
    {
        Icon: IconRoad,
        name: "Choose Your Path",
        description: "Navigate through branching narratives and shape the story as you read.",
        href: "/",
        cta: "Learn more",
        background: <img src={choosePathImage} className="absolute -top-20" />,
        className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    },
    {
        Icon: IconUsers,
        name: "Collaborate",
        description: "Join forces with other writers to create expansive story worlds.",
        href: "/",
        cta: "Learn more",
        background: <img src={collaborateImage} className="absolute -top-20" />,
        className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
    {
        Icon: IconBulb,
        name: "Get Inspired",
        description: "Spark your creativity with unique narratives.",
        href: "/",
        cta: "Learn more",
        background: <img src={inspiredImage} className="absolute -top-20" />,
        className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
    },
];

const Features = () => {
    return (
        <div className="min-h-screen flex items-center justify-center  text-foreground">
            <div className="container mx-auto px-4">
                <div className="text-center">
                    <div className='mb-8'>
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-foreground mb-4">
                            Your Story, <span className='text-accent'>Reimagined</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-muted-foreground">
                            Experience a new era of storytelling where every choice leads to a new adventure, and every writer can leave their mark.
                        </p>
                    </div>
                    <div className="bento-grid text-left">
                        <BentoGrid className="lg:grid-rows-3">
                            {features.map((feature) => (
                                <BentoCard key={feature.name} {...feature} />
                            ))}
                        </BentoGrid>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Features