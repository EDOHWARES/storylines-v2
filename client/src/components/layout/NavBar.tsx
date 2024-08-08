import React, { useState } from 'react'
import { Menu } from 'lucide-react'

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className='fixed sm:w-1/2 sm:translate-x-1/2 top-0 left-0 right-0 m-2 sm:m-5 p-3 sm:p-5 border border-border bg-neutral-50/80 dark:bg-neutral-950/80 rounded-xl sm:rounded-full z-10 backdrop-blur-xl'>
      <div className='flex items-center justify-between'>
        <div className="name">
          <h1 className='text-lg sm:text-xl font-bold'>StoryLines</h1>
        </div>
        <div className="hidden sm:flex space-x-4">
          <a href="#" className="text-foreground font-semibold hover:text-muted-foreground">About</a>
          <a href="#" className="text-foreground font-semibold hover:text-muted-foreground">Sign In</a>
        </div>
        <button
          className="sm:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu size={24} />
        </button>
      </div>
      {isMenuOpen && (
        <div className="sm:hidden mt-2 flex flex-col space-y-2 rounded-none">
          <div className='mt-2 space-y-2 flex flex-col justify-between'>
            <a href="#" className="text-foreground font-semibold hover:text-muted-foreground">About</a>
            <a href="#" className="text-foreground font-semibold hover:text-muted-foreground">Sign In</a>
          </div>
        </div>
      )}
    </nav>
  )
}

export default NavBar