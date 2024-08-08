import React from 'react';
import { useNavigate } from "react-router-dom";
import { IconArrowRight, IconPencil, IconSearch, IconRoad, IconUsers, IconBulb } from '@tabler/icons-react';
import { Button } from '../../components/ui/button';
import AnimatedShinyText from '../../components/magicui/animated-shiny-text';
import { BentoGrid, BentoCard } from "../../components/magicui/bento-grid";
import { cn } from '../../lib/utils';

// Import images
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
      background: <img src={writeBranchImage} className="absolute -top-50 mt-5" alt="Write & Branch" />,
      className: "md:col-span-2 md:row-span-2",
    },
    {
      Icon: IconSearch,
      name: "Explore Stories",
      description: "Dive into a vast universe of interconnected tales crafted by our community.",
      href: "/",
      cta: "Learn more",
      background: <img src={exploreImage} className="absolute -top-20 mt-5" alt="Explore Stories" />,
      className: "md:col-span-1 md:row-span-1",
    },
    {
      Icon: IconRoad,
      name: "Choose Your Path",
      description: "Navigate through branching narratives and shape the story as you read.",
      href: "/",
      cta: "Learn more",
      background: <img src={choosePathImage} className="absolute -top-20" alt="Choose Your Path" />,
      className: "md:col-span-1 md:row-span-1",
    },
    {
      Icon: IconUsers,
      name: "Collaborate",
      description: "Join forces with other writers to create expansive story worlds.",
      href: "/",
      cta: "Learn more",
      background: <img src={collaborateImage} className="absolute -top-20" alt="Collaborate" />,
      className: "md:col-span-1 md:row-span-1",
    },
    {
      Icon: IconBulb,
      name: "Get Inspired",
      description: "Spark your creativity with unique narratives.",
      href: "/",
      cta: "Learn more",
      background: <img src={inspiredImage} className="absolute -top-20" alt="Get Inspired" />,
      className: "md:col-span-1 md:row-span-1",
    },
  ];
  
const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <div className="mb-8">
            <div className="inline-block">
              <div
                className={cn(
                  "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
                )}
              >
                <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-2 text-sm sm:text-base transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                  <span>🐇 Go Down The Rabbit Hole</span>
                  <IconArrowRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                </AnimatedShinyText>
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4">
            Craft Your <span className='text-accent'>Infinite</span> Story
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Dive into a world where every reader is a writer, and every story branches into endless possibilities. 
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button variant="default" onClick={() => navigate('/home')} className="w-full sm:w-auto">Start Writing</Button>
            <Button variant="secondary" className="w-full sm:w-auto">Explore Stories</Button>
          </div>
        </div>

        <div className="mt-16">
          <BentoGrid className="grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {features.map((feature) => (
              <BentoCard key={feature.name} {...feature} />
            ))}
          </BentoGrid>
        </div>
      </div>
    </div>
  );
};

export default Hero;