
import React, { useState, useEffect } from 'react';
import { Page } from '../App';

interface HeaderProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  isScrolled: boolean;
}

const Header: React.FC<HeaderProps> = ({ activePage, setActivePage, isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: { page: Page; label: string }[] = [
    { page: 'laser', label: 'Эпиляция' },
    { page: 'cosmetology', label: 'Косметология' },
    { page: 'products', label: 'Продукция' },
    { page: 'about', label: 'О нас' },
    { page: 'contacts', label: 'Контакты' },
  ];
  
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleNavClick = (page: Page) => {
    const targetElement = document.getElementById(page);
    if (page === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActivePage('home');
    } else if (targetElement) {
        const headerOffset = 80; // height of the header
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        // We set active page to home so that full page components don't render
        setActivePage('home'); 
    } else {
        setActivePage(page);
    }
    setIsMenuOpen(false);
  };
  

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled || isMenuOpen ? 'bg-white/95 shadow-md backdrop-blur-sm' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div 
              className="text-2xl font-bold tracking-wider cursor-pointer text-[#8a6a6a] font-serif"
              onClick={() => handleNavClick('home')}
            >
              ТОЧКА ГЛАДКОСТИ
              <span className="block text-xs font-normal tracking-normal text-gray-500 font-sans">косметология и лазерная эпиляция</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`text-sm font-medium transition-colors duration-300 ${
                    activePage === item.page
                      ? 'text-[#a78b8b] border-b-2 border-[#a78b8b]'
                      : 'text-gray-600 hover:text-[#a78b8b]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="text-gray-600 hover:text-[#a78b8b] focus:outline-none z-50 relative"
                aria-label="Открыть меню"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-2/3 max-w-sm bg-white z-30 shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-8 pt-28">
            <nav className="flex flex-col space-y-8">
                {navItems.map((item) => (
                <button
                    key={item.page}
                    onClick={() => handleNavClick(item.page)}
                    className={`text-xl font-semibold text-left transition-colors duration-300 ${
                    activePage === item.page
                        ? 'text-[#a78b8b]'
                        : 'text-gray-800 hover:text-[#a78b8b]'
                    }`}
                >
                    {item.label}
                </button>
                ))}
            </nav>
        </div>
      </div>
       {/* Overlay */}
       {isMenuOpen && (
        <div 
            className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
            onClick={() => setIsMenuOpen(false)}
        ></div>
       )}
    </>
  );
};

export default Header;
