import React from 'react';
import { Page } from '../App';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[--section-bg] text-[--text] border-t border-[--border]">
      <div className="container py-20">
        <div className="text-center max-w-3xl mx-auto">
          <div 
            className="inline-block cursor-pointer mb-10 transition-transform duration-300 hover:scale-105"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="flex flex-col items-center">
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
          
          <div className="flex justify-center items-center flex-wrap gap-x-8 gap-y-4 mb-10">
              <a href="https://www.instagram.com/tochka_gladkosti_irk?igsh=NHpzeWRhcXFhbTNr" target="_blank" rel="noopener noreferrer" className="text-[--gray] hover:text-[--primary] transition-colors font-medium text-lg">Instagram</a>
              <a href="https://t.me/tochka_gladkosti" target="_blank" rel="noopener noreferrer" className="text-[--gray] hover:text-[--primary] transition-colors font-medium text-lg">Telegram</a>
              <a href="https://yandex.ru/maps/-/CLC~UBnk" target="_blank" rel="noopener noreferrer" className="text-[--gray] hover:text-[--primary] transition-colors font-medium text-lg">Яндекс.Карты</a>
              <a href="https://go.2gis.com/9kCTK" target="_blank" rel="noopener noreferrer" className="text-[--gray] hover:text-[--primary] transition-colors font-medium text-lg">2ГИС</a>
              <a href="tel:+79501298325" className="text-[--gray] hover:text-[--primary] transition-colors font-medium text-lg">+7 (950) 129-83-25</a>
          </div>
          
          <div className="text-base text-[--gray] space-y-2 font-light">
            <p>Иркутская область, Иркутский р-н, д. Грановщина, ул. Георгия Буркова, 2</p>
            <p>Пн - Сб: 09:00 - 20:00</p>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-[--border] text-center text-sm text-gray-400 font-light">
          <p>&copy; {new Date().getFullYear()} Точка Гладкости. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;