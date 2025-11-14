import React from 'react';
import { ServiceItem, CartItem } from '../types';

interface CartProps {
    selectedServices: (ServiceItem & { quantity?: number })[];
    calculation: {
        total: number;
        discount: number;
        discountAmount: number;
        finalPrice: number;
        discountLabel?: string;
    };
    onRemoveService: (service: ServiceItem) => void;
    onQuantityChange?: (serviceId: number | string, newQuantity: number) => void;
    onCheckout: () => void;
    unitName?: { singular: string; plural: string; genitive?: string; };
    showFirstVisitDiscount?: boolean;
    showTieredDiscountHint?: boolean;
    totalQuantity?: number;
    customContent?: React.ReactNode;
}

const TieredDiscountHint: React.FC<{ count: number; hasFullBody: boolean; unitName?: { singular: string; plural: string; } }> = ({ count, hasFullBody, unitName }) => {
    const units = unitName || { singular: 'зону', plural: 'зоны' };
    let hint = '';
    
    if (hasFullBody) return null;

    if (count < 2) {
        const needed = 2 - count;
        const unit = needed === 1 ? units.singular : units.plural;
        hint = `Выберите еще ${needed === 1 ? '1' : needed} ${unit} для скидки 10%`;
    } else if (count === 2) {
        hint = `Ваша скидка 10%! Выберите еще 1 ${units.singular} для 15%!`;
    } else if (count === 3) {
        hint = `Ваша скидка 15%! Выберите еще 1 ${units.singular} для 20%!`;
    } else if (count === 4) {
        hint = `Ваша скидка 20%! Выберите еще 1 ${units.singular} для 25%!`;
    } else {
        hint = `Поздравляем! Ваша максимальная скидка 25%!`;
    }

    return (
        <div className="bg-[--background] p-4 rounded-lg my-6 text-center border border-[--border]">
            <p className="text-sm text-[--text] font-medium">{hint}</p>
        </div>
    );
};

const CourseDiscountHint: React.FC<{ totalQuantity: number, unitName?: { singular: string; plural: string; genitive?: string; } }> = ({ totalQuantity, unitName }) => {
    const units = unitName || { singular: 'услугу', plural: 'услуги', genitive: 'услуг' };
    let hint = '';

    if (totalQuantity > 0 && totalQuantity < 5) {
        const needed = 5 - totalQuantity;
        const unit = needed === 1 ? units.singular : (needed > 4 ? units.genitive : units.plural);
        hint = `Добавьте еще ${needed} ${unit} для скидки 10% на курс!`;
    } else if (totalQuantity >= 5 && totalQuantity <= 10) {
        hint = `Поздравляем! Ваша скидка 10% на курс!`;
    } else if (totalQuantity > 10) {
        hint = `Скидка на курс действует при покупке от 5 до 10 процедур.`;
    }

    if (!hint) return null;

    return (
        <div className="bg-[--background] p-4 rounded-lg my-6 text-center border border-[--border]">
            <p className="text-sm text-[--text] font-medium">{hint}</p>
        </div>
    );
}

const Cart: React.FC<CartProps> = ({ selectedServices, calculation, onRemoveService, onQuantityChange, onCheckout, unitName, showFirstVisitDiscount, showTieredDiscountHint, totalQuantity, customContent }) => {
    const hasFullBodyPackage = selectedServices.some(s => s.id === 26);

    return (
        <div className="w-full">
            <div className="bg-[--section-bg] p-8 lg:p-10 rounded-3xl border border-[--border]">
                <h3 className="text-4xl font-serif font-bold text-[--text] mb-8">{onQuantityChange ? 'Ваш заказ' : 'Ваш план процедур'}</h3>
                {selectedServices.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-[--gray] mb-6 text-lg font-light">Выберите {onQuantityChange ? 'товары' : 'услуги'}, чтобы составить ваш {onQuantityChange ? 'заказ' : 'план'}.</p>
                        {showFirstVisitDiscount && (
                            <div className="bg-[--white] p-5 rounded-xl border-2 border-dashed border-[--primary-light]">
                                <h4 className="font-bold text-xl text-[--primary] mb-2 font-serif">Скидка 40% на первый визит!</h4>
                                <p className="text-[--gray] text-base font-light">Попробуйте лазерную эпиляцию и убедитесь в её эффективности по специальной цене.</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="space-y-4 max-h-72 overflow-y-auto pr-2 mb-4 custom-scrollbar">
                            {selectedServices.map(service => {
                                const cartItem = service as CartItem;
                                const isCourseItem = cartItem.quantity !== undefined && onQuantityChange;
                                
                                return (
                                <div key={service.id} className="flex justify-between items-center text-base">
                                    <span className="text-[--text] flex-1 pr-2 font-light">{service.name}</span>
                                    
                                    {isCourseItem ? (
                                        <div className="flex items-center gap-2 mx-2">
                                            <button onClick={() => onQuantityChange(service.id, cartItem.quantity - 1)} className="w-6 h-6 rounded-full border border-[--border] text-lg flex items-center justify-center hover:bg-[--primary-light] transition-colors">-</button>
                                            <span className="w-6 text-center font-medium">{cartItem.quantity}</span>
                                            <button onClick={() => onQuantityChange(service.id, cartItem.quantity + 1)} className="w-6 h-6 rounded-full border border-[--border] text-lg flex items-center justify-center hover:bg-[--primary-light] transition-colors">+</button>
                                        </div>
                                    ) : (
                                      <span className="font-semibold text-gray-700 mr-4">{service.price}</span>
                                    )}

                                    <button onClick={() => onRemoveService(service)} className="text-gray-400 hover:text-red-500 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </div>
                            )})}
                        </div>
                        
                        {showTieredDiscountHint && <TieredDiscountHint count={selectedServices.length} hasFullBody={hasFullBodyPackage} unitName={unitName} />}
                        {totalQuantity !== undefined && !showTieredDiscountHint && <CourseDiscountHint totalQuantity={totalQuantity} unitName={unitName} />}
                        {customContent}

                        <div className="border-t-2 border-dashed border-[--primary-light] pt-6 space-y-3">
                            <div className="flex justify-between text-lg text-[--gray] font-light">
                                <span>Сумма:</span>
                                <span>{calculation.total} р.</span>
                            </div>
                            {calculation.discountAmount > 0 && (
                                 <div className="flex justify-between text-green-700 font-medium text-lg">
                                    <span>{calculation.discountLabel || `Скидка (${calculation.discount * 100}%)`}:</span>
                                    <span>- {calculation.discountAmount} р.</span>
                                </div>
                            )}
                            <div className="flex justify-between text-3xl font-bold text-[--text] border-t border-[--border] pt-4 mt-4 font-sans">
                                <span>Итого:</span>
                                <span>{calculation.finalPrice} р.</span>
                            </div>
                        </div>
                        <button 
                            onClick={onCheckout}
                            className="w-full btn btn-primary mt-8"
                            disabled={selectedServices.length === 0}
                        >
                            Оформить запись
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;