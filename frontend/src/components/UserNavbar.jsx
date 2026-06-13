import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeDropdown from './ThemeDropdown';
import { Home, Info, Briefcase, PhoneCall } from 'lucide-react';

export default function UserNavbar() {
  const location = useLocation();
  const menuItems = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'About', path: '/about', icon: <Info size={18} /> },
    { name: 'Services', path: '/service', icon: <Briefcase size={18} /> },
    { name: 'Contact', path: '/contact', icon: <PhoneCall size={18} /> }
  ];

  // If on admin routes, show admin-only nav
  const isAdmin = location.pathname.startsWith('/admin');
  const adminMenu = [
    { name: 'Dashboard', path: '/admin-dashboard' },
    { name: 'Upload', path: '/admin-upload-product' }
  ];

  return (
    <>
      {/* DESKTOP & TABLET MANAGEMENT HEADER TOP BAR */}
      <nav className="sticky top-0 z-40 w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-900 text-slate-900 dark:text-slate-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Company Brand Cluster (Top Left) */}
          <Link to="/" className="flex items-center gap-2.5 font-black text-xl tracking-tight">
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-md shadow-blue-500/20">M</div>
            <span>MyCompany</span>
          </Link>

          {/* Desktop Navigation Links (Hidden on Mobile) */}
          <ul className="hidden md:flex items-center gap-8 font-bold text-sm text-slate-600 dark:text-slate-400">
            {(isAdmin ? adminMenu : menuItems).map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className={`transition-colors ${isActive ? 'text-blue-600 dark:text-blue-400' : 'hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Connected Global Theme Switcher System Dropdown (Top Right) */}
          <ThemeDropdown />

        </div>
      </nav>

      {/* MOBILE RESPONSIVE BOTTOM NAVIGATION TRAILING LIST SYSTEM */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 z-40 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] transition-colors duration-300 pb-safe">
        <ul className="flex items-center justify-around h-16">
          {(isAdmin ? adminMenu : menuItems).map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name} className="w-full">
                <Link 
                  to={item.path} 
                  className={`flex flex-col items-center justify-center h-full transition-all text-[10px] font-bold gap-1 ${isActive ? 'text-blue-600 dark:text-blue-400 scale-105' : 'text-slate-400 dark:text-slate-500'}`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
