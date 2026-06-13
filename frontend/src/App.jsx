import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import UserNavbar from './components/UserNavbar';
import Footer from './components/Footer';

// User Views
import Home from './pages/Home';
import About from './pages/About';
import Service from './pages/Service';
import Contact from './pages/Contact';

// Admin Views
import AdminUpload from './admin/AdminUpload';
import AdminDashboard from './admin/AdminDashboard';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 transition-colors duration-300">
          
          {/* Your Responsive Header System */}
          <UserNavbar />

          {/* Your Core Page Content Section */}
          <main className="flex-grow pb-16 md:pb-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/service" element={<Service />} />
              <Route path="/contact" element={<Contact />} />

              <Route path="/admin-upload-product" element={<AdminUpload />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />

              {/* Security Fallback to redirect typos */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Your Unified Shared Footer Component */}
          <Footer />
          
        </div>
      </Router>
    </ThemeProvider>
  );
}
