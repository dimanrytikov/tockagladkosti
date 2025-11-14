import React, { useState, useEffect, useRef } from 'react';

const About: React.FC = () => {
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

    const features = [
        { 
            title: "Индивидуальный подход", 
            description: "Для каждого гостя я разрабатываю персональную программу, учитывая уникальные особенности вашей кожи и пожелания."
        },
        { 
            title: "Внимание к деталям", 
            description: "Ваш комфорт и спокойствие — мой главный приоритет. От проверенных методик до уютной атмосферы."
        },
        { 
            title: "Видимый эффект", 
            description: "Моя работа направлена на достижение стойкого, заметного результата, который будет радовать вас долгое время."
        }
    ];

    return (
        <section ref={sectionRef} id="about" className={`py-24 md:py-40 bg-[--section-bg] overflow-hidden fade-in-section ${isVisible ? 'is-visible' : ''}`}>
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
                    <div className="relative">
                       <div className="relative z-10 p-10 lg:p-14 bg-[--background]/70 rounded-3xl border border-[--border]">
                         <h2 className="text-4xl md:text-5xl font-serif font-bold text-[--text] mb-6 leading-tight">Ваша точка гладкости и гармонии</h2>
                         <p className="text-lg text-[--gray] leading-relaxed font-light">
                            Здравствуйте, меня зовут Екатерина. Я верю, что истинная красота — это гармония здоровья и уверенности в себе. Здесь, в уютной атмосфере, вы сможете отвлечься от повседневной суеты и посвятить время себе. Моя задача — деликатно подчеркнуть вашу естественную привлекательность с помощью самых современных и безопасных методик.
                         </p>
                       </div>
                    </div>
                    <div className="space-y-12">
                       {features.map((feature, index) => (
                           <div key={feature.title} className="flex items-start gap-6">
                               <div className="text-5xl font-serif text-[--primary] font-bold mt-1 opacity-70">0{index + 1}</div>
                               <div>
                                   <h3 className="text-3xl font-serif font-semibold text-[--text] mb-3">{feature.title}</h3>
                                   <p className="text-[--gray] leading-relaxed font-light">{feature.description}</p>
                               </div>
                           </div>
                       ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;