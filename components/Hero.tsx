import React from 'react';
import { Page } from '../App';

interface HeroProps {
  onNavigate: (page: Page) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <div className="h-screen flex items-center justify-center text-center bg-[#f9f5f2] -mt-20 px-4">
      <div className="max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-bold text-[#8a6a6a] mb-4 leading-tight">
          Безупречная гладкость, <br /> профессиональный уход
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
          Откройте для себя мир красоты и уверенности с нашими передовыми методиками лазерной эпиляции и косметологии.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => onNavigate('laser')}
            className="bg-[#8a6a6a] hover:bg-opacity-90 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Услуги эпиляции
          </button>
          <button 
            onClick={() => onNavigate('cosmetology')}
            className="bg-transparent border border-[#8a6a6a] text-[#8a6a6a] hover:bg-[#8a6a6a] hover:text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Эстетическая косметология
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;