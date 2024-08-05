import React, { useState } from 'react';
import { IconBrandGithub, IconMenu2, IconX, IconBrandDiscord } from '@tabler/icons-react';
import {Button} from "../ui/button"

const NavBar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full transition-all duration-300 border-b backdrop-blur-3xl">
      <header className="flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 sm:space-x-6">
          <a href="/" className="text-2xl">StoryLines</a>
        </div>
        <div className="hidden md:flex items-center space-x-2 sm:space-x-4">
          <div className='flex justify-between items-center space-x-4'>
            <Button variant="secondaryBtn">
            <a href="/sign-in">Sign In</a>
            </Button>
          </div>
          <Button variant="primaryBtn"><IconBrandGithub  className="text-black" /></Button>
          <Button variant="tertiaryBtn"><IconBrandDiscord  className="text-black" /></Button>
        </div>
        <Button className="md:hidden btn-icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </Button>
      </header>
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <div className='flex justify-between items-center space-x-4'>
              <a href="/sign-in" className='btn btn-secondary'>Sign In</a>
            </div>
            <div className="flex justify-between items-center">
            <Button variant="primaryBtn"><IconBrandGithub  className="text-black" /></Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;