import React from 'react'

const Footer = () => {
  return (
    <footer className="border-t py-12 ">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-8 md:mb-0">
          <h2 className="text-2xl font-bold">StoryLines</h2>
          <p className="text-sm text-muted-foreground mt-2">Weaving tales, one node at a time</p>
        </div>
        <nav className="flex flex-wrap justify-center md:justify-end">
          <a href="/about" className="mx-3 nav-link">About</a>
          <a href="/contact" className="mx-3 nav-link">Contact</a>
          <a href="/privacy" className="mx-3 nav-link">Privacy Policy</a>
          <a href="/terms" className="mx-3 nav-link">Terms of Service</a>
        </nav>
      </div>
      <div className="container mx-auto mt-8 text-center text-sm text-muted-foreground">
        <p>&copy; 2024 StoryLines. All rights reserved.</p>
        <p>Made by <a href="https://www.praneethravuri.com/" className="underline text-primary font-semibold decoration-dashed" target="_blank" rel="noopener noreferrer">Praneeth Ravuri</a></p>
      </div>
    </footer>
  )
}

export default Footer