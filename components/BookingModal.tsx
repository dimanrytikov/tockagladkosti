import React, { useState, useEffect } from 'react';
import { ServiceItem, CartItem } from '../types';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedServices: (ServiceItem & { quantity?: number })[];
    calculation: {
        finalPrice: number;
    };
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, selectedServices, calculation }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            // Reset state on close
            setName('');
            setPhone('');
            setDate('');
            setTime('');
            setError('');
        }
        return () => {
          document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = new Date(e.target.value);
        const today = new Date();
        today.setHours(0,0,0,0); // Reset time to compare dates only

        // Check if date is in the past
        if (selectedDate < today) {
            setError('Пожалуйста, выберите будущую дату.');
            setDate('');
            return;
        }

        // Check if it's Sunday (getDay() returns 0 for Sunday)
        if (selectedDate.getDay() === 0) {
            setError('Воскресенье — выходной. Пожалуйста, выберите другую дату.');
            setDate('');
        } else {
            setError('');
            setDate(e.target.value);
        }
    };

    const handleWhatsAppSubmit = () => {
        if (!name || !phone) {
            alert('Пожалуйста, введите ваше имя и номер телефона.');
            return;
        }

        const servicesText = selectedServices.map(s => {
            const quantityText = (s as CartItem).quantity > 1 ? ` (x${(s as CartItem).quantity})` : '';
            return `- ${s.name}${quantityText}`;
        }).join('\n');
        
        const message = `
Здравствуйте, Екатерина!

Меня зовут ${name}.
Мой номер телефона: ${phone}

Хочу записаться на следующие процедуры:
${servicesText}

Общая стоимость: ${calculation.finalPrice} р.

Желаемая дата: ${date || 'не указана'}
Желаемое время: ${time || 'не указано'}

Спасибо!
        `;

        const whatsappUrl = `https://wa.me/79501298325?text=${encodeURIComponent(message.trim())}`;
        window.open(whatsappUrl, '_blank');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-[--background] rounded-3xl shadow-2xl w-full max-w-lg border border-[--border]" onClick={e => e.stopPropagation()}>
                <div className="p-10">
                    <div className="flex justify-between items-start mb-8">
                        <h2 className="text-4xl font-serif font-bold text-[--text]">Оформление записи</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors p-2 -mt-2 -mr-2">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                    
                    <div className="space-y-5">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Ваше имя*</label>
                            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full px-4 py-3 text-lg bg-[--white] border border-[--border] rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[--primary-light] focus:border-transparent transition" required />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Контактный номер*</label>
                            <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} className="mt-1 block w-full px-4 py-3 text-lg bg-[--white] border border-[--border] rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[--primary-light] focus:border-transparent transition" required />
                        </div>
                         <div className="grid grid-cols-2 gap-4 pt-2">
                            <div>
                                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">Желаемая дата</label>
                                <input type="date" id="date" value={date} onChange={handleDateChange} className="mt-1 block w-full px-4 py-3 text-lg bg-[--white] border border-[--border] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[--primary-light] focus:border-transparent transition" />
                            </div>
                             <div>
                                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">Желаемое время</label>
                                <input type="time" id="time" value={time} onChange={e => setTime(e.target.value)} className="mt-1 block w-full px-4 py-3 text-lg bg-[--white] border border-[--border] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[--primary-light] focus:border-transparent transition" />
                            </div>
                        </div>
                        {error && <p className="text-sm text-red-600 pt-1">{error}</p>}
                        {!error && <p className="text-xs text-gray-500 pt-1 font-light">Подсказка: Воскресенье - выходной день.</p>}
                    </div>

                    <div className="mt-10">
                         <button 
                            onClick={handleWhatsAppSubmit}
                            className="w-full bg-[#21D065] hover:bg-[#1DA853] text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-3 text-lg"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                            <span>Отправить в WhatsApp</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BookingModal;