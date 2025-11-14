import React, { useState, useEffect, useRef } from 'react';

const Contacts: React.FC = () => {
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

    const address = "Иркутская область, Иркутский р-н, д. Грановщина, ул. Георгия Буркова, 2";

    return (
        <section ref={sectionRef} id="contacts" className={`py-24 md:py-40 bg-[--section-bg] fade-in-section ${isVisible ? 'is-visible' : ''}`}>
            <div className="container">
                <div className="text-center mb-20 max-w-4xl mx-auto">
                    <h2 className="text-5xl md:text-7xl font-serif font-bold text-[--text]">Контакты</h2>
                    <p className="mt-6 text-xl text-[--gray] font-light">
                        Я всегда рада видеть вас. Свяжитесь со мной, чтобы записаться на процедуру или консультацию.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
                    <div className="bg-[--background] rounded-3xl shadow-xl p-10 lg:p-14 border border-[--border] flex flex-col justify-center">
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-serif font-semibold text-[--primary] mb-2">Адрес</h3>
                                <p className="text-[--text] text-lg font-light">{address}</p>
                                <div className="flex items-center gap-6 mt-4">
                                    <a 
                                        href="https://yandex.ru/maps/-/CLC~UBnk"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-[--primary] hover:text-[#A07F63] transition-colors font-medium"
                                    >
                                        <span>Яндекс.Карты</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002 2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                     <a 
                                        href="https://go.2gis.com/9kCTK"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-[--primary] hover:text-[#A07F63] transition-colors font-medium"
                                    >
                                        <span>2ГИС</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002 2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-serif font-semibold text-[--primary] mb-2">Телефон</h3>
                                <a href="tel:+79501298325" className="text-[--text] hover:text-[--primary] transition-colors text-lg font-light">+7 (950) 129-83-25</a>
                            </div>
                            <div>
                                <h3 className="text-xl font-serif font-semibold text-[--primary] mb-2">Часы работы</h3>
                                <p className="text-[--text] text-lg font-light">Пн - Сб: 09:00 - 20:00</p>
                                <p className="text-[--gray] font-light">Вс: Выходной</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-[400px] lg:h-full min-h-[400px] rounded-3xl overflow-hidden shadow-xl border border-[--border]">
                        <iframe
                            src="https://yandex.ru/map-widget/v1/?um=constructor%3A83c0f5f65f3a09772f37c35a6431941d91a9b24479904ab9d774a3f5a237f379&source=constructor"
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            allowFullScreen={true}
                            style={{ position: "relative" }}
                            title="Карта местоположения салона на Яндекс.Картах"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contacts;