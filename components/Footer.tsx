import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#e0d8d8] text-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-[#8a6a6a] tracking-wider mb-4 font-serif">ТОЧКА ГЛАДКОСТИ</h3>
            <p className="text-sm">Ваше пространство красоты и профессионального ухода в Иркутске.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 font-serif">Контакты</h3>
            <ul className="space-y-2 text-sm">
              <li><strong>Адрес:</strong> г. Иркутск, ул. Седова, 65А/3</li>
              <li><strong>Телефон:</strong> +7 (999) 999-99-99</li>
              <li><strong>Email:</strong> info@tochkagladkosti.ru</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 font-serif">Часы работы</h3>
            <ul className="space-y-2 text-sm">
              <li><strong>Пн - Сб:</strong> 09:00 - 20:00</li>
              <li><strong>Вс:</strong> Выходной</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-400/50 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Точка Гладкости. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;