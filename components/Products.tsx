import React, { useState, useEffect, useRef } from 'react';
import { productsData } from '../constants';
import { Product } from '../types';

const ProductCard: React.FC<{ product: Product; onSelect: (product: Product) => void }> = ({ product, onSelect }) => (
    <div 
        className="bg-white rounded-lg shadow-md border border-gray-200/50 p-6 flex flex-col h-full cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
        onClick={() => onSelect(product)}
    >
        <div className="flex-grow">
            <p className="text-sm text-[#a78b8b] mb-2 font-medium tracking-wide uppercase">{product.category}</p>
            <h3 className="font-serif font-semibold text-xl text-gray-800 mb-4 h-16">{product.name}</h3>
        </div>
        <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100">
            <span className="font-bold text-2xl text-[#8a6a6a]">{product.prices[0].price}</span>
            <span className="text-sm text-gray-500">{product.prices[0].size}</span>
        </div>
    </div>
);

const ProductModal: React.FC<{ product: Product | null; onClose: () => void }> = ({ product, onClose }) => {
    if (!product) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="p-8 md:p-12">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <p className="text-base text-[#a78b8b] mb-2 font-medium tracking-wide uppercase">{product.category}</p>
                            <h2 className="text-4xl font-bold text-gray-800">{product.name}</h2>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors -mt-4 -mr-4 p-4">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                    <p className="text-gray-600 mb-8 text-lg">{product.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <h4 className="font-semibold text-xl text-gray-800 mb-3 border-b pb-2">Активные компоненты:</h4>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
                                {product.activeComponents.map((comp, i) => <li key={i}>{comp}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-xl text-gray-800 mb-3 border-b pb-2">Форма выпуска:</h4>
                            <p className="text-gray-600 mt-4">{product.releaseForm}</p>
                        </div>
                    </div>

                    <div className="mt-auto">
                        <h4 className="font-semibold text-xl text-gray-800 mb-4 border-b pb-2">Варианты покупки:</h4>
                        <div className="space-y-3">
                            {product.prices.map((p, i) => (
                                <div key={i} className="flex justify-between items-center bg-[#f9f5f2] p-4 rounded-lg">
                                    <div>
                                        <span className="text-gray-700 font-medium text-lg">{p.size}</span>
                                        {p.tag && <span className="ml-3 text-xs bg-[#a78b8b] text-white px-2 py-1 rounded-full font-semibold uppercase tracking-wider">{p.tag}</span>}
                                    </div>
                                    <span className="font-bold text-2xl text-[#8a6a6a]">{p.price}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


const Products: React.FC = () => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
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

    useEffect(() => {
        if (selectedProduct) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedProduct]);

    return (
        <section ref={sectionRef} id="products" className={`py-16 md:py-24 bg-[#f9f5f2] fade-in-section ${isVisible ? 'is-visible' : ''}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800">Профессиональная косметика SKIN SYNERGY</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        Линейка профессиональных средств для домашнего ухода, разработанная для поддержания здоровья и красоты вашей кожи.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {productsData.map(product => (
                        <ProductCard key={product.id} product={product} onSelect={setSelectedProduct} />
                    ))}
                </div>
            </div>
            <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        </section>
    );
};

export default Products;