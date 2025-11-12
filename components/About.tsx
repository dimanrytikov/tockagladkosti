import React, { useState, useEffect, useRef } from 'react';

const About: React.FC = () => {
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

    const features = [
        { 
            title: "Экспертность", 
            description: "Наша команда состоит из сертифицированных специалистов с медицинским образованием.",
            icon: (className: string) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        },
        { 
            title: "Безопасность", 
            description: "Мы строго соблюдаем санитарные нормы и используем только сертифицированное оборудование.",
            icon: (className: string) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
        },
        { 
            title: "Результат", 
            description: "Наша цель — видимый и долговременный эффект, который превзойдет ваши ожидания.",
            icon: (className: string) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L10 17l-4-4 2.293-2.293a1 1 0 011.414 0L12 14.586l6.293-6.293a1 1 0 011.414 0L21 10" /></svg>
        }
    ];

    return (
        <section ref={sectionRef} id="about" className={`py-16 md:py-24 bg-white fade-in-section ${isVisible ? 'is-visible' : ''}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-800 mb-6">Ваша точка гладкости и гармонии</h2>
                    <p className="text-lg text-gray-600 mb-4">
                        Мы — команда профессионалов, влюбленных в свое дело. Наш салон — это пространство, где современные технологии сочетаются с заботой о каждом клиенте. 
                    </p>
                    <p className="text-gray-600 mb-8">
                        Мы верим, что красота начинается со здоровья кожи, и наша миссия — помочь вам достичь этого, предлагая только самые эффективные и безопасные процедуры. Мы находимся в г. Иркутск, и ждем вас в гости.
                    </p>
                </div>
                <div className="max-w-5xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
                   {features.map(feature => (
                       <div key={feature.title} className="flex flex-col items-center text-center">
                           <div className="flex-shrink-0 h-16 w-16 rounded-full bg-[#f9f5f2] flex items-center justify-center border border-[#e0d8d8]">
                               {feature.icon("h-8 w-8 text-[#a78b8b]")}
                           </div>
                           <div className="mt-4">
                               <h4 className="text-2xl font-semibold text-gray-800 font-serif">{feature.title}</h4>
                               <p className="mt-2 text-gray-600">{feature.description}</p>
                           </div>
                       </div>
                   ))}
                </div>
            </div>
        </section>
    );
};

export default About;