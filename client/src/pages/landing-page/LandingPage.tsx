import React from 'react';
import NavBar from '../../components/layout/NavBar';
import { Button } from '../../components/ui/button';
import { ArrowRight, Star, Users, Pencil, BookOpen } from 'lucide-react';
import Marquee from '../../components/magicui/marquee';
import { cn } from '../../lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion';

const features = [
  {
    name: "Write & Branch",
    description: "Create the first node of your story and watch it branch into infinite possibilities.",
    icon: <Pencil className="h-8 w-8" />,
    color: "bg-yellow-300"
  },
  {
    name: "Explore Stories",
    description: "Dive into a vast universe of interconnected tales crafted by our community.",
    icon: <BookOpen className="h-8 w-8" />,
    color: "bg-pink-400"
  },
  {
    name: "Choose Your Path",
    description: "Navigate through branching narratives and shape the story as you read.",
    icon: <ArrowRight className="h-8 w-8" />,
    color: "bg-green-400"
  },
  {
    name: "Collaborate",
    description: "Join forces with other writers to create expansive story worlds.",
    icon: <Users className="h-8 w-8" />,
    color: "bg-blue-400"
  },
  {
    name: "Get Inspired",
    description: "Spark your creativity with unique narratives and writing prompts.",
    icon: <Star className="h-8 w-8" />,
    color: "bg-purple-400"
  },
];

const stories = [
  {
    name: "Aisha Thompson",
    username: "@cosmic_scribe",
    body: "A Tale of Stardust and Dreams",
  },
  {
    name: "Leo Nakamura",
    username: "@time_weaver",
    body: "Memoirs from the 25th Century",
  },
  {
    name: "Zara Blackwood",
    username: "@shadowInk",
    body: "Heists Across Parallel Universes",
  },
  {
    name: "Finn O'Connor",
    username: "@myth_spinner",
    body: "Where Code Meets Magic",
  },
  {
    name: "Luna Chen",
    username: "@moonTales",
    body: "Stories from the Dark Side of the Moon",
  },
  {
    name: "Xavier Dubois",
    username: "@neon_wordsmith",
    body: "A Cyberpunk Odyssey",
  },
];

const firstRow = stories.slice(0, stories.length / 2);
const secondRow = stories.slice(stories.length / 2);

const colors = ["bg-yellow-300", "bg-pink-400", "bg-blue-400", "bg-green-400", "bg-purple-400"];

const ReviewCard = ({ name, username, body }) => {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl p-4",
        "border-4 border-black",
        randomColor,
        "hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
      )}
    >
      <div className="flex flex-col">
        <figcaption className="text-sm font-bold text-black">
          {name}
        </figcaption>
        <p className="text-xs font-medium text-black/70">{username}</p>
      </div>
      <blockquote className="mt-2 text-sm font-semibold text-black">{body}</blockquote>
    </figure>
  );
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <NavBar />
      <main className="pt-16 md:pt-20 lg:pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <section className="text-center max-w-4xl mx-auto mb-20">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 text-foreground leading-tight">
              Craft Your <span className="text-pink-500">Infinite</span> Story
            </h1>
            <p className="text-xl sm:text-2xl mb-10 font-bold text-foreground">
              Dive into a world where every reader is a writer, and every story branches into endless possibilities!
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button variant="primaryBtn" className="w-full sm:w-auto text-xl py-4 px-8 bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105">
                Start Writing
              </Button>
              <Button variant="secondaryBtn" className="w-full sm:w-auto text-xl py-4 px-8 bg-pink-500 text-white font-bold rounded-full hover:bg-pink-400 transition-all duration-300 transform hover:scale-105 group flex items-center justify-center">
                Explore Stories
                <ArrowRight className="ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
              </Button>
            </div>
          </section>

          <section className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black mb-12 text-center text-blue-600">
              Your Story, <span className="text-green-500">Reimagined</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className={`${feature.color} rounded-2xl p-6 text-black shadow-lg transform hover:scale-105 transition-all duration-300 border-4 border-black`}
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-white rounded-full p-2 mr-3">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-black">{feature.name}</h3>
                  </div>
                  <p className="text-base font-semibold">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div className="relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-white mt-20">
          <Marquee pauseOnHover className="[--duration:20s]">
            {firstRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:20s]">
            {secondRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white"></div>
        </div>
        <section className="container py-20">
          <h2 className="text-4xl md:text-5xl font-black mb-12 text-center text-purple-600">Frequently Asked Questions</h2>
          <div className="w-full md:w-2/3 mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  question: "How does the branching story system work?",
                  answer: "Our platform allows writers to create story nodes that can branch off in multiple directions. Readers can choose which path to follow, effectively co-creating the narrative as they go."
                },
                {
                  question: "Can I collaborate with other writers on a single story branch?",
                  answer: "Absolutely! You can invite other writers to contribute to your story nodes or join existing collaborative projects. This creates a rich, diverse narrative tapestry."
                },
                {
                  question: "How do I keep track of all the story branches I've created or explored?",
                  answer: "We provide a personalized dashboard that visualizes your story map, showing all the nodes you've created or explored. It's like your own literary constellation!"
                },
                {
                  question: "Is there a rating or feedback system for story contributions?",
                  answer: "Yes, we have a community-driven rating system where readers can upvote their favorite story nodes and leave constructive feedback. This helps highlight quality content and encourages writers to improve their craft."
                },
                {
                  question: "Are there any content guidelines or restrictions?",
                  answer: "We encourage creativity but also maintain a safe and inclusive environment. We have community guidelines that prohibit explicit content, hate speech, and copyright infringement. All content should be original or properly attributed."
                },
                {
                  question: "How can I get started if I'm new to creative writing?",
                  answer: "StoryLines is perfect for beginners! You can start by exploring existing stories, contributing to open branches, or starting a simple story node. We also provide writing prompts and tutorials to help you get started."
                }
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index + 1}`} className="border-4 border-black rounded-xl mb-4 overflow-hidden">
                  <AccordionTrigger className="bg-yellow-300 hover:bg-yellow-400 px-4 py-2 font-bold text-lg">{faq.question}</AccordionTrigger>
                  <AccordionContent className="bg-white px-4 py-2">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
    </div>
  )
}

export default LandingPage;