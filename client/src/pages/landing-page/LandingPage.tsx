import React from 'react';
import { Star } from 'lucide-react';
import CustomButton from "../../components/common/CustomButton"

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#f7f3ee] text-black font-sans">
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-black rounded-full mr-2"></div>
          <span className="font-bold text-xl">UPROAR</span>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
          </ul>
        </nav>
        <CustomButton className="text-sm px-4 py-2">
          BE A BRAND SPONSOR
        </CustomButton>
      </header>
      <main className="container mx-auto px-4 mt-20 text-center relative">
        <div className="absolute top-0 left-1/4 text-[#4CAF50]">
          <Star size={32} fill="currentColor" />
        </div>
        <h1 className="text-6xl font-bold mb-6">
          The time for<br />change is now.
        </h1>
        <p className="text-xl mb-10 max-w-2xl mx-auto">
          We bring together fans, brands, influencers and<br />
          non-profits in a fun, gamified environment<br />
          where everybody wins.
        </p>
        <div className="flex justify-center space-x-4 relative">
          <CustomButton className="bg-[#f9c959] hover:bg-[#eedfcc]" icon>
            JOIN THE WAITLIST
          </CustomButton>
          <CustomButton>
            BE A CREATOR
          </CustomButton>
        </div>
        <div className="absolute bottom-0 right-1/4 w-12 h-12 bg-[#2196F3] rounded-full"></div>
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-[#E91E63] transform rotate-45"></div>
      </main>
      <footer className="absolute bottom-0 w-full py-4 px-4 flex justify-between items-center text-sm">
        <div>© 2022 UpRoar Technologies, Inc.</div>
        <div className="flex space-x-4">
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;