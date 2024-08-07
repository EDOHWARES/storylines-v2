import React from 'react';
import { IconArrowRight, IconChevronRight } from '@tabler/icons-react';
import AnimatedShinyText from '../../components/magicui/animated-shiny-text';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/button';

const Hero = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
            <div className="container mx-auto px-4">
                <div className="text-center">
                    <div className="animated-text-btn">
                        <div className="z-10 flex m-5 items-center justify-center">
                            <div
                                className={cn(
                                    "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
                                )}
                            >
                                <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                                    <span>✨ Go Down The Rabbit Hole</span>
                                    <IconArrowRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                                </AnimatedShinyText>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-5xl font-bold mb-4 text-primary">
                        Craft Your Infinite Story
                    </h1>
                    <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
                        Dive into a world where every reader is a writer, and every story branches into endless possibilities. Connect, create, and explore narratives that evolve with each contribution.
                    </p>
                    <div className="space-x-4">
                        <Button variant="default">Start Writing</Button>
                        <Button variant="secondary">Explore Stories</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;