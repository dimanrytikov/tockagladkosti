import React, { useState, useEffect, useRef } from 'react';
import { Page } from '../App';

interface HeaderProps {
  onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredPill, setHoveredPill] = useState<{ left: number; width: number } | null>(null);
  const navRef = useRef<HTMLElement>(null);
  
  const navItems: { page: Page; label: string }[] = [
    { page: 'about', label: 'Обо мне' },
    { page: 'laser', label: 'Эпиляция' },
    { page: 'cosmetology', label: 'Косметология' },
    { page: 'products', label: 'Продукция' },
    { page: 'contacts', label: 'Контакты' },
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const handleNavClick = (page: Page) => {
    if (page === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onNavigate(page);
    }
    setIsMenuOpen(false);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!navRef.current) return;
    const navRect = navRef.current.getBoundingClientRect();
    const targetRect = e.currentTarget.getBoundingClientRect();
    setHoveredPill({
      left: targetRect.left - navRect.left,
      width: targetRect.width,
    });
  };

  const handleMouseLeave = () => {
    setHoveredPill(null);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out ${
          isScrolled ? 'bg-[--background]/80 shadow-md backdrop-blur-lg' : 'bg-transparent'
        }`}
      >
        <div className="container">
          <div className={`flex items-center justify-between transition-[height] duration-500 ${isScrolled ? 'h-24' : 'h-32'}`}>
            <div
              className="cursor-pointer"
              onClick={() => handleNavClick('home')}
            >
              <div className="flex flex-col items-start transition-transform duration-300 hover:scale-105">
                <div className="font-serif text-4xl font-medium tracking-wide text-[--text]">
                  Точка Гладкости
                </div>
                <div className="relative w-full mt-1">
                  <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-[--primary]/50 to-transparent"></div>
                  <div className="text-xs font-normal tracking-[0.4em] text-[--primary] text-center uppercase">
                    Екатерина
                  </div>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center gap-8">
              <div className="bg-[--section-bg]/70 p-1.5 rounded-full border border-[--border]">
                <nav 
                  ref={navRef} 
                  onMouseLeave={handleMouseLeave} 
                  className="relative flex items-center"
                >
                  {hoveredPill && (
                    <div
                      className="absolute bg-white shadow-md rounded-full h-full top-0 transition-all duration-300 ease-out"
                      style={{
                        left: `${hoveredPill.left}px`,
                        width: `${hoveredPill.width}px`,
                      }}
                    />
                  )}
                  {navItems.map((item) => (
                    <button
                      key={item.page}
                      onMouseEnter={handleMouseEnter}
                      onClick={() => handleNavClick(item.page)}
                      className="relative z-10 px-5 py-2.5 rounded-full text-sm font-medium tracking-wider uppercase text-[--gray] transition-colors duration-300 hover:text-[--text]"
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
               <button
                onClick={() => handleNavClick('laser')}
                className="btn btn-primary"
              >
                Записаться
              </button>
            </div>

            <div className="lg:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="text-[--text] hover:text-[--primary] focus:outline-none z-50 relative w-8 h-8"
                aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
              >
                <div className="block w-6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className={`block absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`}></span>
                  <span className={`block absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Fullscreen Menu */}
      <div
        className={`fixed inset-0 bg-[--background] z-30 transition-opacity duration-500 ease-in-out lg:hidden ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="container h-full flex flex-col items-center justify-center text-center">
            <nav className="flex flex-col items-center space-y-10">
                {navItems.map((item, index) => (
                <button
                    key={item.page}
                    onClick={() => handleNavClick(item.page)}
                    className="text-4xl tracking-[0.1em] font-serif font-light text-gray-600 hover:text-[--text] transition-all duration-300 uppercase"
                    style={{ transitionDelay: `${index * 100}ms`}}
                >
                    {item.label}
                </button>
                ))}
            </nav>
            <button
                onClick={() => handleNavClick('laser')}
                className="btn btn-primary mt-24 px-12 py-4 text-base"
            >
                Записаться
            </button>
        </div>
      </div>
    </>
  );
};

export default Header;