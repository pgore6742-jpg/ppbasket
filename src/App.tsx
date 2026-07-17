import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';
import { Deals } from './pages/Deals';
import { AboutUs } from './pages/AboutUs';
import { ContactUs } from './pages/ContactUs';
import { FAQ } from './pages/FAQ';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsConditions } from './pages/TermsConditions';
import { Cart } from './pages/Cart';

// Global Components
import { QuickViewModal } from './components/QuickViewModal';
import { CompareDrawer } from './components/CompareDrawer';
import { LiveChat } from './components/LiveChat';
import { Bell, X, Sparkles } from 'lucide-react';

const AppContent: React.FC = () => {
  const { 
    activePage, 
    theme, 
    notifications, 
    clearAllNotifications 
  } = useApp();

  // Scroll to top on page switches
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  // Sync Dark/Light theme class with document root
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Render correct active page
  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home />;
      case 'products':
        return <Products />;
      case 'product-details':
        return <ProductDetails />;
      case 'deals':
        return <Deals />;
      case 'about':
        return <AboutUs />;
      case 'contact':
        return <ContactUs />;
      case 'faq':
        return <FAQ />;
      case 'privacy':
        return <PrivacyPolicy />;
      case 'terms':
        return <TermsConditions />;
      case 'cart':
        return <Cart />;
      default:
        return <Home />;
    }
  };

  // Find latest unread notification to display as toast
  const latestUnread = notifications.find(n => !n.isRead);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      
      {/* Dynamic Flash Top Notification Banner */}
      {latestUnread && (
        <div className="bg-gradient-to-r from-orange-500 to-[#FF6B00] text-white py-2 px-4 text-xs font-black flex justify-between items-center animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-2 mx-auto">
            <Sparkles size={14} className="animate-spin" />
            <span>{latestUnread.title}: {latestUnread.message}</span>
          </div>
          <button 
            onClick={clearAllNotifications}
            className="p-1 hover:bg-white/10 rounded-full cursor-pointer shrink-0"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Main Navigation */}
      <Navbar />

      {/* Content Canvas Container */}
      <div className="flex-grow">
        {renderPage()}
      </div>

      {/* Main Footer */}
      <Footer />

      {/* Floating Utilities */}
      <QuickViewModal />
      <CompareDrawer />
      <LiveChat />

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
