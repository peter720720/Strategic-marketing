import React from 'react';
import { Link } from 'react-router-dom';
import { Share2, Globe, Link2, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-400 border-t border-slate-800 transition-colors duration-300 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        
        {/* Company Branding */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center text-xs">M</div>
            <span>MyCompany</span>
          </div>
          <p className="text-xs leading-relaxed text-slate-500">
            Architecting world-class conversion solutions engineered to elevate brand engagement metrics.
          </p>
        </div>

        {/* Quick Links Menu */}
        <div>
          <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-widest">Navigation</h4>
          <ul className="space-y-2.5 text-xs font-semibold">
            <li><Link to="/" className="hover:text-blue-400 transition-colors">Home View</Link></li>
            <li><Link to="/about" className="hover:text-blue-400 transition-colors">Corporate Story</Link></li>
            <li><Link to="/service" className="hover:text-blue-400 transition-colors">Capabilities</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Get In Touch</Link></li>
          </ul>
        </div>

        {/* Physical Address Grid */}
        <div className="space-y-2.5 text-xs font-semibold">
          <h4 className="text-white font-bold mb-2 text-xs uppercase tracking-widest">HQ Address</h4>
          <div className="flex items-center gap-2"><MapPin size={14} className="text-blue-500" /> <span>123 Market Road, Lagos</span></div>
          <div className="flex items-center gap-2"><Phone size={14} className="text-blue-500" /> <span>+234 801 234 5678</span></div>
          <div className="flex items-center gap-2"><Mail size={14} className="text-blue-500" /> <span>info@mycompany.com</span></div>
        </div>

        {/* Clean, Error-Free Social Connections */}
        <div>
          <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-widest">Social Channels</h4>
          <div className="flex gap-3 mb-6">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" title="Facebook" className="p-2 bg-slate-800 text-slate-300 rounded-xl hover:bg-blue-600 hover:text-white transition-all"><Share2 size={16} /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" title="Instagram" className="p-2 bg-slate-800 text-slate-300 rounded-xl hover:bg-pink-600 hover:text-white transition-all"><Globe size={16} /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" title="Twitter" className="p-2 bg-slate-800 text-slate-300 rounded-xl hover:bg-sky-500 hover:text-white transition-all"><Link2 size={16} /></a>
          </div>
          
          {/* Admin Dashboard Pathway */}
          <Link to="/admin-dashboard" className="text-[10px] text-slate-600 hover:text-slate-500 underline block">
            System Admin Panel Access Gateway
          </Link>
        </div>

      </div>
      
      <div className="w-full bg-slate-950 text-center py-4 text-[10px] text-slate-600 border-t border-slate-900 font-medium">
        &copy; {new Date().getFullYear()} MyCompany Marketing. Secure Multi-Image Management System.
      </div>
    </footer>
  );
}
