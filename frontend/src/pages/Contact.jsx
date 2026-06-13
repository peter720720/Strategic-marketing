import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';

export default function Contact() {
  return (
    <div className="w-full bg-white dark:bg-slate-950 transition-colors duration-300">
      <section className="max-w-3xl mx-auto px-4 py-20 text-center space-y-12">
        
        {/* Descriptive intro */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Let's Connect</h1>
          <p className="text-base text-slate-500 dark:text-slate-400">Have a question or looking to launch your next project? Get in touch directly through any of our channels below.</p>
        </div>

        {/* BORDERLESS COMMUNICATION CHANNEL ICONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-12 pt-6">
          
          {/* Phone Link Channel */}
          <a 
            href="tel:+2348012345678" 
            className="group flex flex-col items-center gap-3 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <div className="p-4 bg-slate-50 dark:bg-slate-900 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/40 rounded-full transition-all group-hover:scale-110">
              <Phone size={32} className="text-blue-600" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Call Us</span>
            <span className="font-semibold text-lg">+234 801 234 5678</span>
          </a>

          {/* WhatsApp Direct Chat Channel */}
          <a 
            href="https://wa.me" 
            target="_blank" 
            rel="noreferrer" 
            className="group flex flex-col items-center gap-3 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            <div className="p-4 bg-slate-50 dark:bg-slate-900 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/40 rounded-full transition-all group-hover:scale-110">
              <MessageSquare size={32} className="text-emerald-500" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">WhatsApp Chat</span>
            <span className="font-semibold text-lg">Instant Support</span>
          </a>

        </div>

      </section>
    </div>
  );
}
