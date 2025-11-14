import React, { useState, useEffect, useRef, useMemo } from 'react';
import { cosmetologyServices } from '../constants';
import { ServiceCategory, ServiceItem, CartItem } from '../types';
import Cart from './Cart';
import BookingModal from './BookingModal';

const Cosmetology: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<ServiceCategory>(cosmetologyServices[0]);
  const [selectedServices, setSelectedServices] = useState<CartItem[]>([]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

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

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current) };
  }, []);

  const handleSelectService = (service: ServiceItem) => {
    setSelectedServices(prev => {
      const existingService = prev.find(s => s.id === service.id);
      if (existingService) {
        return prev.filter(s => s.id !== service.id);
      } else {
        return [...prev, { ...service, quantity: 1 }];
      }
    });
  };

  const handleQuantityChange = (serviceId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setSelectedServices(prev => prev.filter(s => s.id !== serviceId));
    } else {
      setSelectedServices(prev => 
        prev.map(s => s.id === serviceId ? { ...s, quantity: newQuantity } : s)
      );
    }
  };

  const calculation = useMemo(() => {
    const totalQuantity = selectedServices.reduce((sum, item) => sum + item.quantity, 0);
    const total = selectedServices.reduce((sum, item) => sum + (parseInt(item.price.replace('р', '')) * item.quantity), 0);
    
    let discount = 0;
    let discountLabel = '';
    if (totalQuantity >= 5 && totalQuantity <= 10) {
        discount = 0.10;
        discountLabel = 'Скидка на курс (10%)';
    }

    const discountAmount = Math.floor(total * discount);
    const finalPrice = total - discountAmount;

    return { total, discount, discountAmount, finalPrice, totalQuantity, discountLabel };
  }, [selectedServices]);


  return (
    <>
      <section ref={sectionRef} id="cosmetology" className={`py-24 md:py-40 bg-[--section-bg] fade-in-section ${isVisible ? 'is-visible' : ''}`}>
        <div className="container">
          <div className="text-center mb-20 max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-[--text]">Эстетическая косметология</h2>
            <p className="mt-6 text-xl text-[--gray] font-light">
              Соберите свой курс процедур и получите скидку 10% при выборе от 5 сеансов.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row lg:gap-20 items-start">
            <div className="w-full lg:w-2/3">
              <div className="border-b border-[--border] mb-8">
                <div className="flex space-x-12 overflow-x-auto -mb-px pb-2 justify-center">
                  {cosmetologyServices.map(category => (
                    <button
                      key={category.title}
                      onClick={() => setActiveTab(category)}
                      className={`whitespace-nowrap pb-4 px-2 text-lg font-medium transition-all duration-300 border-b-2 relative ${
                        activeTab.title === category.title
                          ? 'border-[--primary] text-[--primary]'
                          : 'border-transparent text-[--gray] hover:text-[--text]'
                      }`}
                    >
                      {category.title}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="divide-y divide-[--border]">
                {activeTab.subCategories.flatMap(sub => sub.items).map(item => (
                   <div key={item.id} className="flex justify-between items-center py-5">
                      <div>
                          <p className="text-lg text-[--text]">{item.name}</p>
                          {item.duration && <p className="text-base text-[--gray] mt-1 font-light">{item.duration}</p>}
                      </div>
                      <div className="flex items-center gap-6">
                          <span className="font-semibold text-lg text-gray-700 w-28 text-right">{item.price}</span>
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
            
            <div className="w-full lg:w-1/3 mt-12 lg:mt-0">
                <div className="lg:sticky lg:top-36">
                  <Cart
                      selectedServices={selectedServices}
                      calculation={calculation}
                      onRemoveService={handleSelectService}
                      onQuantityChange={handleQuantityChange}
                      onCheckout={() => setIsBookingModalOpen(true)}
                      unitName={{ singular: 'услугу', plural: 'услуги', genitive: 'услуг' }}
                      totalQuantity={calculation.totalQuantity}
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

export default Cosmetology;