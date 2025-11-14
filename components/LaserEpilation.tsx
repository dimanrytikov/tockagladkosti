import React, { useState, useMemo, useEffect, useRef } from 'react';
import { laserServices } from '../constants';
import { ServiceItem } from '../types';
import Cart from './Cart';
import BookingModal from './BookingModal';

const LaserEpilation: React.FC = () => {
    const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([]);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string | null>(laserServices[0].title);

    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1 });
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => { if (sectionRef.current) observer.unobserve(sectionRef.current) };
    }, []);

    const toggleCategory = (categoryTitle: string) => {
        setActiveCategory(prev => prev === categoryTitle ? null : categoryTitle);
    };

    const handleSelectService = (service: ServiceItem) => {
      setSelectedServices(prev =>
        prev.some(s => s.id === service.id)
          ? prev.filter(s => s.id !== service.id)
          : [...prev, service]
      );
    };
  
    const calculation = useMemo(() => {
      const hasFullBodyPackage = selectedServices.some(s => s.id === 26);
      const total = selectedServices.reduce((sum, service) => sum + parseInt(service.price.replace('р', '')), 0);
      let discount = 0;
      let discountAmount = 0;
  
      if (!hasFullBodyPackage) {
        const count = selectedServices.length;
        if (count >= 5) discount = 0.25;
        else if (count === 4) discount = 0.20;
        else if (count === 3) discount = 0.15;
        else if (count === 2) discount = 0.10;
        discountAmount = Math.floor(total * discount);
      }
  
      const finalPrice = total - discountAmount;
      return { total, discount, discountAmount, finalPrice };
    }, [selectedServices]);

    return (
      <>
        <section ref={sectionRef} id="laser" className={`py-24 md:py-40 bg-[--background] overflow-hidden fade-in-section ${isVisible ? 'is-visible' : ''}`}>
          <div className="container">
            <div className="text-center mb-20 max-w-4xl mx-auto">
              <h2 className="text-5xl md:text-7xl font-serif font-bold text-[--text]">Лазерная эпиляция</h2>
              <p className="mt-6 text-xl text-[--gray] font-light">
                Составьте ваш индивидуальный план процедур. Выберите зоны, а мы автоматически рассчитаем вашу персональную скидку.
              </p>
            </div>
  
            <div className="flex flex-col lg:flex-row lg:gap-20 items-start">
              {/* Accordion */}
              <div className="w-full lg:w-2/3">
                <div className="border-t border-[--border]">
                  {laserServices.map((category) => {
                    const isOpen = activeCategory === category.title;
                    return (
                      <div key={category.title} className="border-b border-[--border]">
                        <button
                          onClick={() => toggleCategory(category.title)}
                          className="w-full flex justify-between items-center py-8 text-left"
                        >
                          <span className={`text-3xl lg:text-4xl font-serif font-medium transition-colors duration-300 ${isOpen ? 'text-[--primary]' : 'text-[--text]'}`}>{category.title}</span>
                          <div className="w-8 h-8 flex items-center justify-center">
                            <svg className={`w-6 h-6 transform transition-transform duration-500 ease-in-out ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </button>
                        <div className={`overflow-hidden transition-all duration-700 ease-in-out ${isOpen ? 'max-h-[1000px]' : 'max-h-0'}`}>
                          <div className="pb-6 pt-2 divide-y divide-[--border]">
                              {category.subCategories.flatMap(sc => sc.items).map(item => (
                                <div key={item.id} className="flex justify-between items-center py-5">
                                  <div>
                                    <p className="text-lg text-[--text]">{item.name}</p>
                                    {item.note && <p className="text-sm text-[--primary] font-medium mt-2 max-w-md font-sans">{item.note}</p>}
                                  </div>
                                  <div className="flex items-center gap-6">
                                    <span className="font-semibold text-lg text-gray-700 w-24 text-right">{item.price}</span>
                                    <button
                                      onClick={() => handleSelectService(item)}
                                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border ${
                                        selectedServices.some(s => s.id === item.id) ? 'bg-[--primary] text-white border-transparent' : 'bg-transparent border-[--border] hover:bg-[--section-bg] hover:border-[--primary-light]'
                                      }`}
                                    >
                                      {selectedServices.some(s => s.id === item.id) ?
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg> :
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                                      }
                                    </button>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Cart */}
              <div className="w-full lg:w-1/3 mt-12 lg:mt-0">
                  <div className="lg:sticky lg:top-36">
                    <Cart
                        selectedServices={selectedServices}
                        calculation={calculation}
                        onRemoveService={handleSelectService}
                        onCheckout={() => setIsBookingModalOpen(true)}
                        showFirstVisitDiscount={true}
                        showTieredDiscountHint={true}
                    />
                  </div>
              </div>
            </div>
          </div>
        </section>
  
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          selectedServices={selectedServices}
          calculation={calculation}
        />
      </>
    );
  };
  
  export default LaserEpilation;