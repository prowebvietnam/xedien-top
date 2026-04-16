import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Car, 
  Bike, 
  Truck, 
  MapPin, 
  LayoutDashboard, 
  Newspaper, 
  Menu, 
  X,
  Search,
  Bell,
  Scale
} from 'lucide-react';
import { cn } from './lib/utils';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const VehicleCatalog = lazy(() => import('./pages/VehicleCatalog'));
const Comparison = lazy(() => import('./pages/Comparison'));
const News = lazy(() => import('./pages/News'));
const StationMap = lazy(() => import('./pages/StationMap'));
const VehicleDetail = lazy(() => import('./pages/VehicleDetail'));

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Khám phá', path: '/', icon: Zap },
    { name: 'Bảng giá', path: '/catalog', icon: LayoutDashboard },
    { name: 'So sánh', path: '/compare', icon: Scale },
    { name: 'Tin tức', path: '/news', icon: Newspaper },
    { name: 'Trạm sạc', path: '/map', icon: MapPin },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div 
              whileHover={{ rotate: 180 }}
              className="bg-tesla-red p-1.5 rounded-lg"
            >
              <Zap className="text-white w-6 h-6" />
            </motion.div>
            <span className="font-display text-xl font-black tracking-tighter text-slate-900">
              xedien<span className="text-tesla-red">.top</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-tesla-red",
                  location.pathname === item.path ? "text-tesla-red" : "text-slate-600"
                )}
              >
                {item.name}
              </Link>
            ))}
            <button className="p-2 text-slate-500 hover:text-tesla-red transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
             <button className="p-2 text-slate-500">
              <Bell className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-900"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-3 py-4 text-base font-semibold text-slate-900 border-b border-slate-50 last:border-0"
                >
                  <item.icon className="w-5 h-5 text-tesla-red" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col pt-16">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={
            <div className="flex items-center justify-center h-[80vh]">
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-12 h-12 bg-tesla-red rounded-full"
              />
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<VehicleCatalog />} />
              <Route path="/compare" element={<Comparison />} />
              <Route path="/news" element={<News />} />
              <Route path="/map" element={<StationMap />} />
              <Route path="/vehicle/:id" element={<VehicleDetail />} />
            </Routes>
          </Suspense>
        </main>

        <footer className="bg-slate-900 text-slate-400 py-12 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="text-tesla-red w-6 h-6" />
                <span className="font-display text-xl font-black tracking-tighter text-white">
                  xedien<span className="text-tesla-red">.top</span>
                </span>
              </div>
              <p className="max-w-xs text-sm">
                Nền tảng tra cứu giá và so sánh xe điện số 1 Việt Nam. Đồng hành cùng cuộc cách mạng giao thông xanh.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Danh mục</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/catalog?cat=bike">Xe đạp điện</Link></li>
                <li><Link to="/catalog?cat=motor">Xe máy điện</Link></li>
                <li><Link to="/catalog?cat=car">Ô tô điện</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Công cụ</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/compare">So sánh chi phí</Link></li>
                <li><Link to="/map">Tìm trạm sạc</Link></li>
                <li><Link to="/news">Tin tức mới nhất</Link></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-xs">
            © {new Date().getFullYear()} xedien.top. All rights reserved. Designed for Elite Performance.
          </div>
        </footer>
      </div>
    </Router>
  );
}
