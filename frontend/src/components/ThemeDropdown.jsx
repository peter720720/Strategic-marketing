import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeDropdown() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Main Theme Trigger Button */}
      <button 
        onClick={() => setOpen(!open)}
        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200 transition-all flex items-center gap-2 cursor-pointer"
      >
        {theme === 'light' ? (
          <Sun size={18} className="text-amber-500" />
        ) : (
          <Moon size={18} className="text-blue-500" />
        )}
        <span className="capitalize text-xs font-bold hidden sm:inline text-slate-900">
          {theme} Mode
        </span>
      </button>

      {/* Dropdown Card */}
      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-50">
          <button 
            onClick={() => { setTheme('light'); setOpen(false); }} 
            className="w-full text-left px-4 py-2.5 text-xs font-bold flex items-center gap-2 text-slate-800 hover:bg-slate-100 cursor-pointer"
          >
            <Sun size={14} className="text-amber-500" /> Light
          </button>
          <button 
            onClick={() => { setTheme('dark'); setOpen(false); }} 
            className="w-full text-left px-4 py-2.5 text-xs font-bold flex items-center gap-2 text-slate-800 hover:bg-slate-100 cursor-pointer"
          >
            <Moon size={14} className="text-blue-500" /> Dark
          </button>
        </div>
      )}
    </div>
  );
}
