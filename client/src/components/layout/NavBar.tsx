import React, { useState } from 'react';
import { IconBrandGithub, IconBrandDiscord, IconBrandX, IconMenu2, IconX } from '@tabler/icons-react';
import { Button } from "../ui/button";
import { ModeToggle } from '../mode-toggle';

const NavBar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/about", text: "About" },
    { href: "/story-map", text: "Explore" },
    { href: "/donate", text: "Donate" },
  ];

  const socialLinks = [
    { Icon: IconBrandGithub, text: "GitHub" },
    { Icon: IconBrandDiscord, text: "Discord" },
    { Icon: IconBrandX, text: "X (Twitter)" },
  ];

  const loggedInLinks = [
    {href : '#', text : 'Theme Rooms'},
    {href : '#', text: 'Bookmarks'}
  ]

  return (
    <nav className="w-full fixed z-50 transition-all duration-300 border-b border-border/40 backdrop-blur-xl">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-semibold text-foreground">
              StoryLines
            </a>
            <div className="hidden ml-10 md:flex items-center space-x-4">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-foreground/80 hover:text-foreground">
                  {link.text}
                </a>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            {socialLinks.map(({ Icon, text }) => (
              <Button key={text} variant="custom" size="icon" className="hidden lg:inline-flex">
                <Icon className="h-5 w-5" />
              </Button>
            ))}
            <ModeToggle />
            <Button variant="custom2">Sign In</Button>
          </div>
          <div className="md:hidden">
            <Button variant="custom" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <IconX className="h-5 w-5" /> : <IconMenu2 className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/40">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-foreground"
              >
                {link.text}
              </a>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-border/40">
            <div className="flex items-center px-5">
              <Button variant="outline" className="w-full">Sign In</Button>
            </div>
            <div className="mt-3 px-2 space-y-1">
              {socialLinks.map(({ Icon, text }) => (
                <Button key={text} variant="custom" className="w-full justify-start">
                  <Icon className="h-5 w-5 mr-2" />
                  {text}
                </Button>
              ))}
              <div className="px-3 py-2">
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;