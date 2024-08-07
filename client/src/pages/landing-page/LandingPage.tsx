import React from 'react';
import NavBar from '../../components/layout/NavBar';
import Hero from './Hero';
import Features from './Features';
import StoryShowcase from './StoryShowcase';
import Questions from './Questions';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <main>
      <section className="nav-bar">
        <NavBar />
      </section>
      <div className='bg-pattern'>
        <section>
          <Hero />
        </section>
        <section>
          <Features />
        </section>
        <section>
          <StoryShowcase />
        </section>
        <section>
          <Questions />
        </section>
        <section>
          <Footer />
        </section>
      </div>
    </main>
  )
}

export default LandingPage