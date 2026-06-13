import React from 'react';

export default function About() {
  return (
    <div className="w-full bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-16">
        
        {/* SECTION 1: CORPORATE VALUE TEXTS */}
        <section className="space-y-4">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Who We Are</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Our Passion is Driving Your Client Growth</h1>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Founded with a commitment to design excellence, our firm crafts production digital tools that help businesses tell their stories beautifully. We merge marketing expertise with modern software development to build seamless customer experiences.
          </p>
        </section>

        {/* SECTION 2: PRODUCTION/SALES INVENTORY TEXT OVERVIEW */}
        <section className="p-8 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
          <h2 className="text-2xl font-bold">Premium Quality and Standards</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Every project and product asset cataloged inside our systems goes through thorough quality checks. We focus on durability, modern style, and high utility to make sure your investments deliver excellent value over time.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            *(Note: This text template can be easily swapped out for your client's custom copywriting once they provide it!)*
          </p>
        </section>

      </div>
    </div>
  );
}
