import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((r) => r.json())
      .then((data) => { if (data.success) setProducts(data.data); })
      .catch(() => {});
  }, []);
  return (
    <div className="w-full bg-white dark:bg-slate-950 transition-colors duration-300">
      
      {/* SECTION 1: HERO DISPLAY OVERLAY WITH FULL BACK-IMAGE BOUNDARY */}
      <section 
        className="relative w-full h-[75vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `linear-gradient(to bottom, rgba(15,23,42,0.65), rgba(15,23,42,0.8)), url('https://unsplash.com')` }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center text-white space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
            Welcome to <span className="text-blue-500">MyCompany</span> Marketing
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto font-medium leading-relaxed">
            We architect conversion paths and premium creative digital platforms engineered to transform your business outreach and amplify profitability overnight.
          </p>
          <div className="pt-2">
            <Link to="/service" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-7 py-3.5 rounded-xl shadow-lg hover:shadow-blue-500/20 transition-all active:scale-95 text-sm">
              <span>Explore Our Services</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: CLEAN, BORDERLESS INDEPENDENT MARKETING VALUES LAYOUT */}
      <section className="w-full max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        
        {/* Value Item 1 - Completely Borderless and Transparent */}
        <div className="bg-transparent border-0 shadow-none p-0 space-y-2">
          <h3 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
            Strategic Vision
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            We optimize every step of your conversion cycle to help your brand stand out from the competition.
          </p>
        </div>

        {/* Value Item 2 - Completely Borderless and Transparent */}
        <div className="bg-transparent border-0 shadow-none p-0 space-y-2">
          <h3 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
            Creative Direction
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            Our beautiful design systems keep your target audience fully engaged and building trust in your brand.
          </p>
        </div>

        {/* Value Item 3 - Completely Borderless and Transparent */}
        <div className="bg-transparent border-0 shadow-none p-0 space-y-2">
          <h3 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
            Data Operations
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            We track user metrics cleanly to fine-tune operations and ensure you get a strong return on investment.
          </p>
        </div>

      </section>

      {/* Products are shown on the Services page — intentionally omitted here. */}

    </div>
  );
}
