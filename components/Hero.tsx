import React from 'react';
import { Page } from '../App';

interface HeroProps {
  onNavigate: (page: Page) => void;
}

const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden z-0">
    <div className="absolute top-0 -left-1/4 w-full h-full lg:w-3/4 lg:h-3/4 bg-gradient-to-br from-[--section-bg] to-transparent opacity-80 rounded-full filter blur-3xl animate-blob"></div>
    <div className="absolute bottom-0 -right-1/4 w-full h-full lg:w-3/4 lg:h-3/4 bg-gradient-to-tl from-[--primary-light]/40 to-transparent opacity-50 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
    <style jsx>{`
      @keyframes blob {
        0% { transform: translate(0px, 0px) scale(1); }
        33% { transform: translate(40px, -60px) scale(1.15); }
        66% { transform: translate(-30px, 30px) scale(0.9); }
        100% { transform: translate(0px, 0px) scale(1); }
      }
      .animate-blob {
        animation: blob 15s infinite ease-in-out;
      }
      .animation-delay-2000 { animation-delay: 3s; }
    `}</style>
  </div>
);

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section id="home" className="relative h-screen min-h-[800px] flex items-center overflow-hidden bg-[--background]">
      <AnimatedBackground />
      <div className="container relative z-10">
        <div className="max-w-4xl text-center md:text-left">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-[--text] mb-8 leading-none font-medium">
            Искусство быть собой
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-[--gray] max-w-2xl mx-auto md:mx-0 leading-relaxed font-light">
            Откройте мир профессионального ухода, где современные технологии и персональное внимание создают вашу естественную красоту.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start items-center">
            <button 
              onClick={() => onNavigate('laser')}
              className="btn btn-primary"
            >
              Запись на эпиляцию
            </button>
            <button 
              onClick={() => onNavigate('cosmetology')}
              className="btn btn-secondary font-serif normal-case text-lg font-normal"
            >
              Услуги косметолога
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;