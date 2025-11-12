
import React, { useState, useEffect, useRef } from 'react';
import { laserServices } from '../constants';
import { ServiceCategory } from '../types';

const ServiceTable: React.FC<{ category: ServiceCategory }> = ({ category }) => (
  <div className="mb-12">
    <h3 className="text-2xl font-semibold text-[#8a6a6a] mb-6 border-b-2 border-[#d1c1c1] pb-2">{category.title}</h3>
    <div className="space-y-4">
      {category.items.map((item, index) => (
        <div key={index} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md hover:bg-[#fdfbf9] transition-all duration-300">
          <p className="text-gray-700">{item.name}</p>
          <p className="font-bold text-lg text-[#8a6a6a]">{item.price}</p>
        </div>
      ))}
    </div>
  </div>
);

const LaserEpilation: React.FC = () => {
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

  const specialOffers = [
    { title: "Скидка 40% на первый визит!", description: "Попробуйте наши услуги и убедитесь в их эффективности по специальной цене." },
    { title: "Создай свой идеальный комплекс!", description: "2 зоны: скидка 10% | 3 зоны: 15% | 4 зоны: 20% | 5 и более зон: 25% от общей суммы." },
    { title: "Для мужчин", description: "Стоимость услуг выше на 30%." }
  ];

  return (
    <section ref={sectionRef} id="laser" className={`py-16 md:py-24 bg-[#f9f5f2] fade-in-section ${isVisible ? 'is-visible' : ''}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">Лазерная Эпиляция</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Мы используем диодный лазер последнего поколения Mediostar Next Pro — безболезненный и подходящий для всех фототипов кожи.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {specialOffers.map((offer, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-[#a78b8b]">
                    <h4 className="font-bold text-xl text-[#8a6a6a] mb-2">{offer.title}</h4>
                    <p className="text-gray-600">{offer.description}</p>
                </div>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
          {laserServices.map((category) => (
            <ServiceTable key={category.title} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LaserEpilation;
