import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Scale, 
  Zap, 
  Fuel, 
  CreditCard, 
  Wrench, 
  TrendingDown, 
  ArrowRight,
  Info
} from 'lucide-react';
import { MOCK_VEHICLES } from '../data/mockData';
import { formatCurrency, cn } from '../lib/utils';

export default function Comparison() {
  const [selectedEVId, setSelectedEVId] = useState(MOCK_VEHICLES[0].id);
  const [distancePerMonth, setDistancePerMonth] = useState(1000); // km

  const ev = MOCK_VEHICLES.find(v => v.id === selectedEVId) || MOCK_VEHICLES[0];
  
  // Simulation: Comparison with an equivalent gas vehicle
  // Assumes gas motorcycle consumes 2.5L/100km, price 25k/L
  // Assumes gas car consumes 8L/100km, price 25k/L
  const gasPrice = 25000;
  const gasConsumption = ev.category === 'electric_car' ? 8 : 2.5; 
  const gasFuelCostPerMonth = (distancePerMonth / 100) * gasConsumption * gasPrice;
  const gasMaintenancePerMonth = ev.category === 'electric_car' ? 1000000 : 300000;
  
  const evFuelCostPerMonth = distancePerMonth * ev.operatingCostPerKm;
  const evMaintenancePerMonth = ev.maintenanceCostPerYear / 12;

  const totalEv = evFuelCostPerMonth + evMaintenancePerMonth;
  const totalGas = gasFuelCostPerMonth + gasMaintenancePerMonth;
  const monthlySavings = totalGas - totalEv;
  const yearlySavings = monthlySavings * 12;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <Scale className="w-12 h-12 text-tesla-red mx-auto mb-4" />
        <h1 className="font-display text-5xl font-black italic tracking-tighter mb-4 uppercase">So Sánh Chi Phí</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">Bộ công cụ tính toán chi tiết giúp bạn so sánh chi phí vận hành giữa xe điện và xe xăng tương đương.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Input Panel */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200">
            <h3 className="font-bold mb-6 flex items-center">
              <Zap className="w-5 h-5 text-tesla-red mr-2" />
              Chọn xe điện của bạn
            </h3>
            <div className="space-y-4">
              {MOCK_VEHICLES.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedEVId(v.id)}
                  className={cn(
                    "w-full p-4 rounded-xl border text-left transition-all",
                    selectedEVId === v.id 
                      ? "border-tesla-red bg-red-50 ring-1 ring-tesla-red" 
                      : "border-slate-200 hover:border-slate-400"
                  )}
                >
                  <div className="font-bold text-sm">{v.name}</div>
                  <div className="text-[10px] uppercase font-black text-slate-400">{v.brand}</div>
                </button>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="font-bold mb-4 flex items-center">
                <CreditCard className="w-5 h-5 text-tesla-red mr-2" />
                Quãng đường hàng tháng
              </h3>
              <input 
                type="range" 
                min="100" 
                max="5000" 
                step="100" 
                value={distancePerMonth}
                onChange={(e) => setDistancePerMonth(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-tesla-red"
              />
              <div className="flex justify-between items-center mt-2 font-mono text-sm font-bold">
                <span>100 km</span>
                <span className="text-tesla-red">{distancePerMonth} km</span>
                <span>5,000 km</span>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-slate-900 rounded-3xl text-white">
             <div className="flex items-start space-x-3">
               <Info className="w-5 h-5 text-tesla-red shrink-0" />
               <p className="text-xs text-slate-400">
                 * Số liệu dựa trên mức giá nhiên liệu trung bình tại Việt Nam (Tháng 4/2026) và thông số kỹ thuật do nhà sản xuất công bố.
               </p>
             </div>
          </div>
        </div>

        {/* Output Results */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* EV Card */}
            <motion.div 
              key={`ev-${selectedEVId}`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white p-8 rounded-[2.5rem] border-2 border-tesla-red shadow-xl"
            >
              <div className="flex items-center space-x-2 mb-6 text-tesla-red">
                <Zap className="w-6 h-6 fill-current" />
                <span className="font-black text-xs uppercase tracking-widest">Chi phí Xe Điện</span>
              </div>
              <h4 className="text-2xl font-black mb-8">{ev.name}</h4>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">Năng lượng/Tháng</span>
                  <span className="font-mono font-bold text-slate-900">{formatCurrency(evFuelCostPerMonth)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">Bảo trì/Tháng</span>
                  <span className="font-mono font-bold text-slate-900">{formatCurrency(evMaintenancePerMonth)}</span>
                </div>
                <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                  <span className="font-bold">Tổng/Tháng</span>
                  <span className="font-mono text-xl font-black text-tesla-red">{formatCurrency(totalEv)}</span>
                </div>
              </div>
            </motion.div>

            {/* GAS Card */}
            <div className="bg-slate-100 p-8 rounded-[2.5rem] border border-slate-200">
              <div className="flex items-center space-x-2 mb-6 text-slate-500">
                <Fuel className="w-6 h-6" />
                <span className="font-black text-xs uppercase tracking-widest">Xe Xăng tương đương</span>
              </div>
              <h4 className="text-2xl font-black mb-8">Xe đốt trong</h4>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">Xăng/Tháng</span>
                  <span className="font-mono font-bold text-slate-900">{formatCurrency(gasFuelCostPerMonth)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">Bảo trì/Tháng</span>
                  <span className="font-mono font-bold text-slate-900">{formatCurrency(gasMaintenancePerMonth)}</span>
                </div>
                <div className="pt-6 border-t border-slate-200 flex justify-between items-center">
                  <span className="font-bold">Tổng/Tháng</span>
                  <span className="font-mono text-xl font-black text-slate-500">{formatCurrency(totalGas)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Savings Highlight */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-green-500 rounded-[3rem] p-12 text-white flex flex-col md:flex-row items-center justify-between shadow-2xl shadow-green-500/30 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <TrendingDown className="w-64 h-64 -rotate-12" />
            </div>
            <div className="relative z-10 text-center md:text-left mb-8 md:mb-0">
              <p className="font-black text-xs uppercase tracking-widest opacity-80 mb-2">Số tiền bạn tiết kiệm được</p>
              <h3 className="font-display text-4xl md:text-6xl font-black leading-none">
                {formatCurrency(yearlySavings)} / Năm
              </h3>
            </div>
            <div className="relative z-10">
              <Link to="/catalog">
                <button className="px-8 py-4 bg-white text-green-600 font-black uppercase text-sm rounded-full hover:scale-105 transition-transform active:scale-95 shadow-lg">
                  Chuyển sang xe điện ngay
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
