import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { MOCK_VEHICLES } from '../data/mockData';
import { VehicleCategory } from '../types';
import { formatCurrency, cn } from '../lib/utils';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  { id: 'all', name: 'Tất cả', icon: '🚙' },
  { id: VehicleCategory.ELECTRIC_CAR, name: 'Ô tô điện', icon: '🚗' },
  { id: VehicleCategory.ELECTRIC_MOTORCYCLE, name: 'Xe máy điện', icon: '🛵' },
  { id: VehicleCategory.ELECTRIC_BIKE, name: 'Xe đạp điện', icon: '🚲' },
];

export default function VehicleCatalog() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVehicles = MOCK_VEHICLES.filter(v => {
    const matchesTab = activeTab === 'all' || v.category === activeTab;
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          v.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="font-display text-5xl font-black italic tracking-tighter mb-4">BẢNG GIÁ XE ĐIỆN</h1>
        <p className="text-slate-500 max-w-2xl">Dữ liệu được cập nhật từ các đại lý chính hãng và showroom uy tín trên toàn quốc.</p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex p-1 bg-slate-100 rounded-2xl w-fit">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={cn(
                "px-6 py-3 rounded-xl text-sm font-bold transition-all flex items-center space-x-2",
                activeTab === cat.id 
                  ? "bg-white text-tesla-red shadow-sm" 
                  : "text-slate-500 hover:text-slate-800"
              )}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Tìm theo tên xe hoặc hãng..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl w-full md:w-80 focus:ring-2 focus:ring-tesla-red/20 focus:border-tesla-red outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence mode='popLayout'>
          {filteredVehicles.map((vehicle) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={vehicle.id}
              className="group bg-white rounded-[2rem] border border-slate-100 p-2 hover:shadow-xl transition-all"
            >
              <div className="relative h-48 rounded-[1.5rem] overflow-hidden bg-slate-50">
                <img src={vehicle.imageUrl} className="w-full h-full object-cover" alt={vehicle.name} referrerPolicy="no-referrer" />
              </div>
              <div className="p-6">
                <span className="text-[10px] font-black tracking-widest text-tesla-red uppercase">{vehicle.brand}</span>
                <h3 className="font-bold text-slate-900 group-hover:text-tesla-red transition-colors">{vehicle.name}</h3>
                <div className="mt-4 flex items-end justify-between">
                  <div className="font-mono text-sm font-black text-slate-900 leading-tight">
                    {formatCurrency(vehicle.basePrice)}
                  </div>
                  <Link to={`/vehicle/${vehicle.id}`}>
                    <div className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-tesla-red hover:text-white transition-all">
                      <ChevronDown className="-rotate-90 w-4 h-4" />
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredVehicles.length === 0 && (
        <div className="py-20 text-center">
          <div className="text-4xl mb-4">🤷‍♂️</div>
          <p className="text-slate-400">Không tìm thấy mẫu xe nào phù hợp với yêu cầu của bạn.</p>
        </div>
      )}
    </div>
  );
}
