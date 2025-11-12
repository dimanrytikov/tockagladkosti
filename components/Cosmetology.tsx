
import React, { useState, useEffect, useRef } from 'react';
import { cosmetologyServices } from '../constants';

const Cosmetology: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id="cosmetology" className={`py-16 md:py-24 bg-white fade-in-section ${isVisible ? 'is-visible' : ''}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">Косметология</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Профессиональный уход для вашей кожи: от естественного лифтинга до глубокого очищения и омоложения.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {cosmetologyServices.map((category) => (
            <div key={category.title} className="mb-12">
              <h3 className="text-2xl font-semibold text-[#8a6a6a] mb-6 border-b-2 border-[#d1c1c1] pb-2">{category.title}</h3>
              <div className="space-y-4">
                {category.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center bg-[#fdfbf9] p-4 rounded-lg shadow-sm hover:shadow-md hover:bg-[#f9f5f2] transition-all duration-300">
                    <div>
                      <p className="text-gray-700 font-medium">{item.name}</p>
                      {item.duration && <p className="text-sm text-gray-500">{item.duration}</p>}
                    </div>
                    <p className="font-bold text-lg text-[#8a6a6a]">{item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="bg-[#f9f5f2] p-6 rounded-lg text-center shadow-lg border border-[#e0d8d8]">
            <h4 className="font-bold text-xl text-[#8a6a6a] mb-2">Специальное предложение</h4>
            <p className="text-gray-600">Курс 5-10 сеансов — <span className="font-bold">скидка 10%</span>. Достигайте стойкого и видимого результата с выгодой.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cosmetology;
