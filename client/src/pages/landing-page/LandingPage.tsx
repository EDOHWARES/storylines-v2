import React from 'react';
import NavBar from '../../components/layout/NavBar';
import Hero from './Hero';

const LandingPage = () => {
  return (
    <main>
      <section className="nav-bar">
        <NavBar />
      </section>
      <section>
        <Hero />
      </section>
    </main>
  )
}

export default LandingPage