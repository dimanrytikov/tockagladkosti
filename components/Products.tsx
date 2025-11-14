import React, { useState, useEffect, useRef, useMemo } from 'react';
import { productsData, productCategories } from '../constants';
import { Product, ProductCategory, CartItem } from '../types';
import Cart from './Cart';
import BookingModal from './BookingModal';

const ProductCard: React.FC<{ 
    product: Product; 
    category: ProductCategory; 
    onSelect: (product: Product) => void;
    isSelected: boolean;
}> = ({ product, category, onSelect, isSelected }) => {
    return (
        <div 
            className="group relative flex flex-col rounded-3xl p-6 overflow-hidden transition-all duration-500 ease-in-out border border-[--border] h-[250px] hover:h-[520px] bg-white"
            style={{ '--category-color': category.color } as React.CSSProperties}
        >
            <div className="absolute inset-0 transition-opacity duration-500 opacity-20 group-hover:opacity-100" style={{ background: `radial-gradient(circle at top left, var(--category-color) 0%, transparent 50%)`}}></div>

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex-shrink-0">
                    <p className="text-sm font-medium tracking-widest uppercase" style={{ color: `var(--category-color)` }}>{category.name}</p>
                    <h3 className="font-serif font-semibold text-2xl text-[--text] leading-snug mt-3">{product.name}</h3>
                    {product.subtitle && <p className="text-xs text-gray-400 font-light tracking-widest mt-1 uppercase">{product.subtitle}</p>}
                </div>
                
                <div className="flex-grow flex flex-col justify-center overflow-hidden opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-full transition-all duration-700 ease-in-out delay-100">
                     <p className="text-[--gray] text-base leading-relaxed font-light my-4">{product.description}</p>
                     <button 
                        onClick={() => onSelect(product)}
                        className={`w-full mt-auto py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 transform hover:scale-105 ${isSelected ? 'bg-[--primary] text-white shadow-lg' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                     >
                        {isSelected ? '✓ В корзине' : 'Добавить в корзину'}
                     </button>
                </div>

                <div className="mt-auto flex-shrink-0 flex justify-between items-end">
                    <div className="flex items-baseline gap-2">
                        <span className="font-bold text-3xl font-sans" style={{color: `var(--category-color)`}}>{product.prices[0].price}</span>
                        {product.prices.length > 1 && <span className="text-sm text-gray-500">и другие</span>}
                    </div>
                    <span className="text-base text-[--gray] font-light">{product.prices[0].size}</span>
                </div>
            </div>
        </div>
    );
};


const Products: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string>(productCategories[0].id);
    const [selectedProducts, setSelectedProducts] = useState<CartItem[]>([]);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [hadProcedure, setHadProcedure] = useState(false);
    
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1 });

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => { if (sectionRef.current) observer.unobserve(sectionRef.current) };
    }, []);
    
    const filteredProducts = useMemo(() => {
        return productsData.filter(p => p.categoryId === activeCategory);
    }, [activeCategory]);

    const handleSelectProduct = (product: Product) => {
        setSelectedProducts(prev => {
            const isSelected = prev.some(p => p.id === product.id);
            if (isSelected) {
                return prev.filter(p => p.id !== product.id);
            } else {
                const newCartItem: CartItem = {
                    id: product.id,
                    name: product.name,
                    price: product.prices[0].price,
                    quantity: 1,
                };
                return [...prev, newCartItem];
            }
        });
    };

    const handleQuantityChange = (productId: number | string, newQuantity: number) => {
        if (newQuantity <= 0) {
            setSelectedProducts(prev => prev.filter(p => p.id !== productId));
        } else {
            setSelectedProducts(prev => 
                prev.map(p => p.id === productId ? { ...p, quantity: newQuantity } : p)
            );
        }
    };

    const handleRemoveProduct = (product: CartItem) => {
        setSelectedProducts(prev => prev.filter(p => p.id !== product.id));
    };

    const calculation = useMemo(() => {
        const total = selectedProducts.reduce((sum, item) => sum + parseInt(item.price.replace(/\s/g, '').replace('р', '')) * item.quantity, 0);
        const discount = hadProcedure ? 0.10 : 0;
        const discountAmount = Math.floor(total * discount);
        const finalPrice = total - discountAmount;
        return { total, discount, discountAmount, finalPrice, discountLabel: 'Скидка после процедуры (10%)' };
    }, [selectedProducts, hadProcedure]);

    const discountCheckbox = (
        <div className="bg-[--background] p-4 rounded-lg my-6 border border-[--border]">
            <label className="flex items-center gap-3 cursor-pointer">
                <input
                    type="checkbox"
                    checked={hadProcedure}
                    onChange={(e) => setHadProcedure(e.target.checked)}
                    className="h-5 w-5 rounded border-gray-300 text-[--primary] focus:ring-[--primary]"
                    style={{boxShadow: 'none'}}
                />
                <span className="text-sm text-[--text] font-medium">Скидка 10% после процедуры</span>
            </label>
            <p className="text-xs text-gray-500 mt-1 pl-8 font-light">Отметьте, если вы приобретаете косметику в день проведения любой косметологической процедуры или эпиляции.</p>
        </div>
    );

    return (
        <>
            <section ref={sectionRef} id="products" className={`py-24 md:py-40 bg-[--background] fade-in-section ${isVisible ? 'is-visible' : ''}`}>
                <div className="container">
                    <div className="text-center mb-16 max-w-4xl mx-auto">
                        <h2 className="text-5xl md:text-7xl font-serif font-bold text-[--text]">Профессиональная косметика</h2>
                        <p className="mt-6 text-xl text-[--gray] font-light">
                            Линейка средств SKIN SYNERGY для домашнего ухода, разработанная для поддержания здоровья и красоты вашей кожи.
                        </p>
                    </div>
                    
                    <div className="flex flex-col lg:flex-row lg:gap-20 items-start">
                        <div className="w-full lg:w-2/3">
                            <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16">
                                {productCategories.map(category => (
                                    <button 
                                        key={category.id}
                                        onClick={() => setActiveCategory(category.id)}
                                        className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${activeCategory === category.id ? 'text-white border-transparent' : 'bg-transparent text-[--gray] border-[--border] hover:bg-[--section-bg] hover:text-[--text]'}`}
                                        style={activeCategory === category.id ? { backgroundColor: category.color } : {}}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                {filteredProducts.map(product => {
                                    const category = productCategories.find(c => c.id === product.categoryId);
                                    if (!category) return null;
                                    const isSelected = selectedProducts.some(p => p.id === product.id);
                                    return <ProductCard key={product.id} product={product} category={category} onSelect={handleSelectProduct} isSelected={isSelected} />
                                })}
                            </div>
                        </div>

                        <div className="w-full lg:w-1/3 mt-12 lg:mt-0">
                            <div className="lg:sticky lg:top-36">
                                <Cart
                                    selectedServices={selectedProducts}
                                    calculation={calculation}
                                    onRemoveService={handleRemoveProduct}
                                    onQuantityChange={handleQuantityChange}
                                    onCheckout={() => setIsBookingModalOpen(true)}
                                    customContent={selectedProducts.length > 0 ? discountCheckbox : null}
                                    unitName={{ singular: 'товар', plural: 'товара', genitive: 'товаров' }}
                                    totalQuantity={selectedProducts.reduce((sum, item) => sum + item.quantity, 0)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                selectedServices={selectedProducts}
                calculation={calculation}
            />
        </>
    );
};

export default Products;