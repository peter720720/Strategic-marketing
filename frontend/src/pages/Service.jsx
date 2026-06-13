import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Service() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => { if (data.success) setProducts(data.data); })
      .catch(err => console.error(err));
  }, []);

  const slideLeft = () => {
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const slideRight = () => {
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full bg-white dark:bg-slate-950 transition-colors duration-300">
      
      {/* SECTION 1: DETAILED CORE SERVICE TEXT */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Our Specialized Capabilities</h1>
        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
          From deploying custom storefront systems to running highly targeted paid advertising campaigns, we build powerful modern tools tailored specifically to your company's workflows.
        </p>
      </section>

      {/* SECTION 2: DYNAMIC PRODUCT SLIDER CAROUSEL ROW */}
      <section className="bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center sm:text-left">Featured Product Solutions</h2>
          
          {products.length === 0 ? (
            <div className="text-center text-sm text-slate-400 py-12">No products published to show yet.</div>
          ) : (
            <div className="relative w-full max-w-md mx-auto bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-md animate-fade-up">
              
              {/* Image Viewport */}
              <div className="relative aspect-square bg-slate-100 dark:bg-slate-900">
                <img 
                  src={products[currentIndex].images[0]} 
                  alt={products[currentIndex].name} 
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>

              {/* Slider Controls Layer */}
              <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                <button onClick={slideLeft} className="p-2 bg-white/90 dark:bg-slate-900/90 rounded-full shadow-md hover:bg-white dark:hover:bg-slate-800 pointer-events-auto transition-all active:scale-90">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={slideRight} className="p-2 bg-white/90 dark:bg-slate-900/90 rounded-full shadow-md hover:bg-white dark:hover:bg-slate-800 pointer-events-auto transition-all active:scale-90">
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Product Info Block */}
              <div className="p-5 text-center">
                <h4 className="font-bold text-lg">{products[currentIndex].name}</h4>
                <p className="text-blue-600 dark:text-blue-400 font-extrabold mt-1">₦{products[currentIndex].price.toLocaleString()}</p>
              </div>

            </div>
          )}
        </div>
      </section>

    </div>
  );
}
