import React, { useState, useEffect, useRef } from 'react';

const Contacts: React.FC = () => {
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
        <section ref={sectionRef} id="contacts" className={`py-16 md:py-24 bg-white fade-in-section ${isVisible ? 'is-visible' : ''}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800">Контакты</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        Мы всегда рады видеть вас в нашем салоне. Свяжитесь с нами, чтобы записаться на процедуру или консультацию.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="bg-[#f9f5f2] p-8 rounded-lg shadow-lg">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-2xl font-semibold text-[#8a6a6a] mb-2 font-serif">Адрес</h3>
                                <p className="text-gray-600">г. Иркутск, ул. Седова, 65А/3</p>
                            </div>
                             <div>
                                <h3 className="text-2xl font-semibold text-[#8a6a6a] mb-2 font-serif">Телефон</h3>
                                <a href="tel:+79999999999" className="text-gray-600 hover:text-[#8a6a6a] transition-colors">+7 (999) 999-99-99</a>
                            </div>
                             <div>
                                <h3 className="text-2xl font-semibold text-[#8a6a6a] mb-2 font-serif">Email</h3>
                                <a href="mailto:info@tochkagladkosti.ru" className="text-gray-600 hover:text-[#8a6a6a] transition-colors">info@tochkagladkosti.ru</a>
                            </div>
                             <div>
                                <h3 className="text-2xl font-semibold text-[#8a6a6a] mb-2 font-serif">Часы работы</h3>
                                <p className="text-gray-600">Пн - Сб: 09:00 - 20:00</p>
                                <p className="text-gray-600">Вс: Выходной</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg overflow-hidden shadow-xl">
                         <a href="https://2gis.ru/irkutsk/geo/70000001105253482" target="_blank" rel="noopener noreferrer" className="block">
                            <img 
                                src="https://static.tildacdn.com/tild3133-3166-4531-b636-643261356434/map.jpg" 
                                alt="Карта местоположения салона" 
                                className="w-full h-full object-cover"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contacts;